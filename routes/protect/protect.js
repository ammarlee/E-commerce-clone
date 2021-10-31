const path = require("path")
const User =require(path.join(__dirname,'../../models/user'))
var jwt = require('jsonwebtoken')
const {promisify} =require('util')

// FUNCTION FOR PROTECT ROUTES WITH JWT
exports.protect = async (req,res,next)=>{
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
  req.userId=freshUser._id
  req.user = freshUser
  next()

}
exports.restrictRoutes = (...roles)=>{
  return (req,res,next)=>{
    if (!roles.includes(req.user.role)) {
     return res.status(400).json({msg:'you are not admin'})
    }else{
      next()
    }
  }
}