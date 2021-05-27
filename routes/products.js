const path = require('path')
const express = require('express')
const router = express.Router()
const User =require(path.join(__dirname,'../models/user'))
var jwt = require('jsonwebtoken')
const productController = require(path.join(__dirname,'../controlles/product/products'))
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

router.get('/zoom',productController.homePage)
router.post('/product/search',productController.searching)
router.get('/user-products/:userId',productController.userProducts)
router.post('/review',productController.createReview)
router.get('/review/:productId',productController.fetchReviews)
  router.post('/make/makeOrder',productController.makeOrder)
  router.get('/get/orders/:id',productController.getUserOrders)
  router.post('/add/addCart',protect,productController.addToCart)
  router.get('/single/cart/:id',productController.getUserCart)
  router.post('/delete/cart',protect,productController.deleteItemFromcart)
  router.post('/delete/clear',protect,productController.clearCart)
  router.post('/productId/:id',productController.getProductDetails)
  router.get('/p/:id',productController.getProductDetails)

module.exports = router