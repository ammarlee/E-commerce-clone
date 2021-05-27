const path = require('path')
const express = require("express")
const router = express.Router()
const adminController = require(path.join(__dirname,'../controlles/admin/admin'))
const protectRoutes = require(path.join(__dirname,'./protect/protect'))
const upload = require(path.join(__dirname,'../controlles/multer'))

router.post('/file-upload', upload.array('files', 10),adminController.CreateProduct)
router.post('/file/edit/:id',upload.array('files', 10),adminController.editProduct)
router.post('/delete-category/:id',  adminController.deleteCategory)
router.post('/userdata',  adminController.updateUserData)
router.get('/userdata/:id',adminController.userData)
router.get('/get-category',adminController.getCategory)
router.post('/changePassword',protectRoutes.protect,adminController.changePassword)// UPDATE USER INFORMATION
router.post('/createCategory',adminController.createCategory)
router.post('/download',adminController.downloadOrders)

// products for specific user
router.get('/admin/:id',protectRoutes.protect,adminController.userProducts)//  GET  USER`S CART ITEMS TO THE 
// EDIT PRODUCT
router.post('/:id',adminController.deleteProduct)

module.exports = router;