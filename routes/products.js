const path = require('path')
const express = require('express')
const router = express.Router()
const User =require(path.join(__dirname,'../models/user'))
const productController = require(path.join(__dirname,'../controlles/product/products'))

var jwt = require('jsonwebtoken')
const {promisify} =require('util')

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

router.get('/home',productController.homePage)
router.post('/product/search',productController.searching)

router.post('/review',productController.createReview)
router.get('/review/:productId',productController.fetchReviews)

  // router.post('/productId/:id',productController.getProductDetails)
  router.get('/product/:id',productController.getProductDetails)

module.exports = router