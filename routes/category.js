
const path = require('path')
const express = require("express")
const router = express.Router()
const CategoryController = require(path.join(__dirname,'../controlles/category/category'))
const {protect,restrictRoutes} =require(path.join(__dirname,'./protect/protect')) 

router.post('/add-category',  protect,
restrictRoutes("admin"),CategoryController.createCategory)
router.post('/category-edit',  protect,
restrictRoutes("admin"),CategoryController.editCategory)

router.post('/add-sub-child',  protect,
restrictRoutes("admin"),CategoryController.addSubChildTOCategory)

router.post('/delete-category/:id',  protect,
restrictRoutes("admin"),CategoryController.deleteCategory)


router.post('/delete-sub-category',  protect,
restrictRoutes("admin"),CategoryController.deleteSubChildCategory)
router.post('/edit-sub-child',  protect,
restrictRoutes("admin"),CategoryController.editSubChildCategory)


router.get('/get-category',CategoryController.getCategory)
module.exports = router
