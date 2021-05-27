var path = require('path');
const bycript = require('bcryptjs')
const fs = require('fs')
const nodeMailer = require('nodemailer')
const nodegride = require('nodemailer-sendgrid-transport')
const Product=require(path.join(__dirname,'../../models/product'))
const Category=require(path.join(__dirname,'../../models/category'))
const User = require(path.join(__dirname,'../../models/user'))
const io = require(path.join(__dirname,'../../socket'))
const PDFDocument = require('pdfkit');
const clody = require('../cloud')
const {cloudinary} = require('../cloudinary');
const Socket = require(path.join(__dirname,'../../socket'));

const transporter = nodeMailer.createTransport(nodegride({

  auth:{
    api_key:"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"
  }
}))

exports.createCategory=async(req,res,next)=>{
  let d = req.body.name
  const pic = req.body.img
  try {
    const respo= await cloudinary.uploader.upload(pic,{
      upload_preset:'byr4al94'})
  const newImage = respo.url
    const cat = new Category({name:d,img:newImage})
    const newone = await cat.save()
    Socket.getIO().emit('category',{action:'create',category:newone})
    res.status(200).json({newone,success:true})
    
  } catch (error) {

    res.status(400).json({error,success:false})
    
  }
}

exports.getCategory=(req,res,next)=>{
  Category.find({}).then(cat=>{
    res.status(200).json({cat,success:true})
  }).catch(err=>{
    res.status(400).json({err,success:false})

  })
}
exports.deleteCategory=(req,res,next)=>{
  const id = req.params.id
  Category.findOneAndRemove({_id:id}).then(cat=>{
    Socket.getIO().emit('category',{action:'deleteCategory',category:cat})
    res.status(200).json({cat,success:true})
  }).catch(err=>{
    res.status(400).json({err,success:false})

  })
}
 //  GET  USER`S data
exports.userData =(req,res,next)=>{
  const userId=req.params.id
  User.findOne({_id:userId}).then((user)=>{
    res.status(200).json({
      success:true,
      data:user
    })
  }).catch((err)=>{
    res.status(401).json({
      success:false,
      data:'null',
      err
    })
  })
}
exports.updateUserData= async(req, res, next) =>{
  const thePhoto = req.body.pic[0]
  const user = req.body.profile
  const profile = req.body.profile
  let pic 
  if (!thePhoto) {
    pic =profile.img
  } else {
    pic =thePhoto
  }
  try {
    const respo= await cloudinary.uploader.upload(pic,{
        upload_preset:'byr4al94'})
    const newImage = respo.url
    const updateed = await User.findOneAndUpdate({_id:user._id},{img:newImage,name:profile.name,email:profile.email})
    console.log(updateed);
    res.status(200).json({
      msg:'yayayaya'
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error
    })
  }

}
exports.CreateProduct= async (req, res, next) => {
  let d = JSON.parse(req.body.data)
  let user = JSON.parse(req.body.user)
  let {name,price,quantity,category,description} = d
  try {
    const uploader = async(path)=>await clody.uploads(path)
    let urls = []
    const files = req.files
    for(let file of files){
      const {path} = file
      const newpath = await uploader(path)
      urls.push(newpath)
    }
    const images = urls.map(p=>{
      return p.url
    })
    const product = new Product({
        name,price,quantity,img:images,category,description,userId:user._id
       })
      const products = await product.save()
      Socket.getIO().emit('category',{action:'createProduct',product:products,msg:'new product has been added '})
    res.status(200).json({success:true,products})
  } catch (error) {
    res.status(400).json({error ,success:false})

  }

}
exports.downloadOrders=(req,res,next)=>{
  const orders = req.body.orders
  const name = 'order_'+orders.products[0]._id + '.pdf'
  var dir = path.join('./orders');
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
  const pathName = path.join(__dirname,'../','../',dir,name)
  
  let i = []
  const edit = orders.products.forEach((p)=>{
    return i.push(p)
  })
  const pdfDoc = new PDFDocument();
  res.setHeader('Content-Type' , 'application/pdf')
  res.setHeader('Content-Disposition' , 'inline;filename="'+name+'" ')
  pdfDoc.pipe(fs.createWriteStream(pathName));
  pdfDoc.pipe(res);
  pdfDoc
  .fontSize(25)
  .text('Details for your Orders ', 100, 100);
pdfDoc.text('_________________________')
pdfDoc.text(`price :${orders.total} 
________________________________________`  )
i.forEach((item)=>{
  pdfDoc.text(`
  name : ${item.name} 
  price : ${item.price} 
  quantity : ${item.quantity} 
  description : ${item.description} 
  -----------------------------------
  `)

})

pdfDoc.end();

}


// ...................................................................
// EDIT PRODUCT
exports.editProduct =async (req,res,next)=>{
       let d = JSON.parse(req.body.product)
      let user = JSON.parse(req.body.user)
      let {name,price,quantity,category,description} = d
      try {
        const uploader = async(path)=>await clody.uploads(path)
        let urls = []
        const files = req.files
        console.log(files);
        for(let file of files){
          const {path} = file
          const newpath = await uploader(path)
          urls.push(newpath)
        }
        const images = urls.map(p=>{
          return p.url
        })
        const edited = await Product.findOneAndUpdate(
          {_id:user._id},
          {$set:{name,img:images,price,quantity,description,category}},{new: false})
        console.log(edited);
        res.status(200).json({
          success:true,
          msg:'you have edited product'
        })
      } catch (error) {
        res.status(401).json({
          success:false,
          msg:'you coludnt  have edit the product'
        })
      }
    
  }
  // delete product
  exports.deleteProduct =(req,res,next)=>{
      const  productId = req.params.id
      console.log(productId);
     return Product.findOneAndRemove({_id:productId}).then((product)=>{
      Socket.getIO().emit('category',{action:'deleteProduct',product})
      res.status(200).json({
        success:true,
        msg:'you have deleted product',
        product
      })
  
  
      }).catch(err=>{
        res.status(401).json({
          success:false,
          msg:'you coludnt  have deleted the product'
        })
      })
      // res.send('DELTE SINGLE PRODUCT WITH THAT ID ',productId)
  }

  // UPDATE USER PASSWORD
  exports.changePassword =async(req,res,next)=>{
    const email=req.body.email
    const newpass=req.body.new
    const old=req.body.old
    const id=req.body.id
    try {
      const user =await User.findOne({_id:id,email:email})
      
     return bycript.compare(old,user.password).then((correct)=>{
        if (!correct) {
          console.log('not correct');
         return res.status(404).json({
            success:false,
            msg:'your password is wrong'
          })
        }
        console.log('correct');
        bycript.hash(newpass,12,(err,hashedpassword)=>{
          if(err){
            res.status(401).json({
              user:'there is no user',
              success:false,
              err
            })
          }
          user.password=hashedpassword
         return user.save()
         .then(()=>{
          res.status(200).json({
            user,
            success:true,
            msg:'you have changed your password succefully'
          })
    
          })
    
        })
    })
   
    } catch (error) {
  return res.status(401).json({
    success:false,
    error,
  })  
    }
  }
  
  // products for specific user
  exports.userProducts =(req,res,next)=>{
    const userId= req.params.id
    Product.find({userId:userId}).then((products)=>{
      if (products.length ==0) {
       return res.status(500).json({
          msg:'you have not added products '
        })
      }
     return res.status(200).json({
       products
     })
    }).catch(err=>{
      return res.status(400).json({
        err,
        success:false
      })
    })
  }
 
  
  