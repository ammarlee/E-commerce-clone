
const path = require('path')
const express = require("express")
const router = express.Router()
const CategoryController = require(path.join(__dirname,'../controlles/category/category'))
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
router.post('/add-category',CategoryController.createCategory)
router.post('/category-edit',CategoryController.editCategory)

router.post('/delete-category/:id',CategoryController.deleteCategory)
router.get('/get-category',CategoryController.getCategory)
module.exports = router
