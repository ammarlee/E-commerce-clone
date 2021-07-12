const path = require('path')
const express = require("express")
const router = express.Router()
const protectRoutes = require(path.join(__dirname,'./protect/protect'))
const userController = require(path.join(__dirname,'../controlles/user/user'))


router.post('/userdata',  userController.updateUserData)
router.get('/userdata/:id',userController.userData)
router.post('/changePassword',protectRoutes.protect,userController.changePassword)// UPDATE USER INFORMATION
// products for specific user
router.get('/admin/:id',protectRoutes.protect,userController.userProductsAdmin)//  GET  USER`S CART ITEMS TO THE 
// EDIT PRODUCT
router.get('/user-products/:userId',userController.userProducts)

module.exports = router
