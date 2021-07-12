
const path = require('path')
const express = require('express')
const router = express.Router()
const orderController = require(path.join(__dirname,'../controlles/order/order'))

router.post('/download',orderController.downloadOrders)
 router.post('/make/makeOrder',orderController.makeOrder)
 router.get('/get/orders/:id',orderController.getUserOrders)
 router.get('/get/single-order/:id',orderController.getSingleOrder)

 module.exports = router
