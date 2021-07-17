const path = require('path')
const express = require("express")
const router = express.Router()
const adminController = require(path.join(__dirname,'../controlles/admin/admin'))
const upload = require(path.join(__dirname,'../controlles/multer'))

router.post('/file-upload', upload.array('files', 10),adminController.CreateProduct)
router.post('/file/edit/:id',upload.array('files', 10),adminController.editProduct)
router.post('/:id',adminController.deleteProduct) 


module.exports = router;