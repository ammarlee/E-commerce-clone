
const path = require('path')
const express = require('express')
const router = express.Router()
const {protect,restrictRoutes} =require(path.join(__dirname,'./protect/protect')) 

const CardController = require('../controlles/card/card')



  router.post('/increase/card',protect,CardController.increaseCard)
  router.post('/decrease/card',protect,CardController.decreaseCard)
  router.post('/setQuantity/card',protect,CardController.setQuantity)
  
router.post('/add/addCart',protect,CardController.addToCart)

router.get('/single/cart/:id',CardController.getUserCart)
router.post('/delete/cart',protect,CardController.deleteItemFromcart)
router.post('/delete/clear',protect,CardController.clearCart)

module.exports = router