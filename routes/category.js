
const path = require('path')
const express = require("express")
const router = express.Router()
const CategoryController = require(path.join(__dirname,'../controlles/category/category'))
const upload = require(path.join(__dirname,'../controlles/multer'))


router.post('/add-category',CategoryController.createCategory)
router.post('/category-edit',CategoryController.editCategory)

router.post('/add-sub-child',CategoryController.addSubChildTOCategory)

router.post('/delete-category/:id',CategoryController.deleteCategory)


router.post('/delete-sub-category',CategoryController.deleteSubChildCategory)

router.get('/get-category',CategoryController.getCategory)
module.exports = router
