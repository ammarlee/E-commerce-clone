
const path = require('path')
const express = require('express')
const router = express.Router()
const User =require(path.join(__dirname,'../models/user'))


var jwt = require('jsonwebtoken')
const {promisify} =require('util')
// const CardController = require(path.join(__dirname,'../controlles/card/card'))
const CardController = require('../controlles/card/card')
const protect= async(req,res,next)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
      token=req.headers.authorization.split(' ')[1]
    }
    if(!token){
      return res.status(401).json({error:'you are not authanticated'})
    }
    const decoded = await promisify(jwt.verify)(token,'shhhhh')
    // find if user still exist or not 
    const freshUser = await User.findOne({_id:decoded.id})
    if (!freshUser) {
      return res.status(401).json({
        error:'user not exist yet'
      })
      
    }
    req.userId=decoded.userId
    next()
  
  }


  router.post('/increase/card',protect,CardController.increaseCard)
  router.post('/decrease/card',protect,CardController.decreaseCard)
  router.post('/setQuantity/card',protect,CardController.setQuantity)
  
router.post('/add/addCart',protect,CardController.addToCart)

router.get('/single/cart/:id',CardController.getUserCart)
router.post('/delete/cart',protect,CardController.deleteItemFromcart)
router.post('/delete/clear',protect,CardController.clearCart)

module.exports = router