var path = require('path');
const Product =require(path.join(__dirname,'../../models/product'))
const Cart =require(path.join(__dirname,'../../models/cart'))
const Order = require(path.join(__dirname,'../../models/order'))
const Review = require(path.join(__dirname,'../../models/review'))
const algoliasearch = require("algoliasearch");
const client = algoliasearch("SRG9R6FP41", "a10e35ddd54011feeb240cf013c0f9b0");
const index = client.initIndex("amazontest");
const nodeMailer = require('nodemailer')
const nodegride = require('nodemailer-sendgrid-transport')
const transporter = nodeMailer.createTransport(nodegride({

  auth:{
    api_key:"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"
  }
}))


exports.makeOrder=async (req,res,next)=>{
  const userId = req.body.cart.userId
  let date = new Date()
  try {
    const newOrder = await Order.create({
      userId,
      items:{products:req.body.cart.products,total:req.body.total,date}
    })
   const  newOne = await newOrder.save()
   return res.status(200).json({
     order:newOne,
     success:true
   })
    
  } catch (error) {
    return res.status(401).json({
      success:false,
      msg:'you have a problem with adding order',
      error
    })
  }
  }
  exports.getSingleOrder = async (req,res,next)=>{
    const orderId= req.params.id
    try {
  let order = await Order.findOne({_id:orderId})
  if(!order){
    res.status(500).json({
      msg:'you have not`t any order yet'
    })
  }else{
    res.status(200).json({
      success:true,
      order
    })
  }
  
} catch (error) {
  res.status(401).json({
    err,
    success:false,
    msg:'you have not`t any orders yet'

  })
}
   
  }

exports.getUserOrders=async (req,res,next)=>{
    const userId= req.params.id
    try {
  let orders = await Order.find({userId})
  if(!orders){
    res.status(500).json({
      msg:'you have not`t any orders yet'
    })
  }else{
    res.status(200).json({
      success:true,
      orders
    })
  }
  
} catch (error) {
  res.status(401).json({
    err,
    success:false,
    msg:'you have not`t any orders yet'

  })
}
   
  }
  
  // POST A NEW ITEMS TO THE CARD 
  exports.addToCart=async (req,res,next)=>{
          const name = req.body.name
          const price = req.body.price
          const quantity = req.body.quantity
          const img = req.body.img[0]
          const description = req.body.description
          const category = req.body.category
          const productId = req.body._id
          if (!req.body.user) {
            return res.status(500).json({
              msg:'you have to login '
            })
          }
          const userId = req.body.user._id
  try {
      const product_id = await Product.findOne({_id:productId})
      let cart = await Cart.findOne({ userId });
      if (cart) {
        let itemIndex = cart.products.findIndex(p => p.productId == productId);
        if (itemIndex > -1) {
          let productItem = cart.products[itemIndex];
          productItem.quantity += 1;
          cart.products[itemIndex] = productItem;
        } else {
          //product does not exists in cart, add new item
          cart.products.push({ productId, quantity:1, name, price,description,img,category });
        }
        cart = await cart.save();
        return res.status(201).send(cart);
      } else {
        //no cart for user, create new cart
        const newCart = await Cart.create({
          userId,
          products: [{ productId, quantity:1, name, price,img,category,description }]
        });
  
        return res.status(201).send(newCart);
      }
    } catch (err) {
      console.log(err);
     return res.status(500).send("Something went wrong");
    }
         
  }
  
  exports.getUserCart=(req,res,next)=>{
      let u = req.params.id
      Cart.findOne({userId:u}).then((card)=>{
        return  res.status(200).json({
            cart:card,
            
        })
      }).catch((err)=>{
          return res.status(500).json({
              err:err
  
           })
      })
  }
  exports.deleteItemFromcart=(req,res,next)=>{
    const cartId = req.body.cart
    const productId = req.body.productId
    let editedId = productId.trim()
    Cart.findOne({_id:cartId}).then(products=>{
      let filteredCart = products.products.filter(item=>{
        return item.productId.toString() !== editedId.toString()
      })
      let oldcart = products
      Cart.findOneAndUpdate({_id:cartId}, {$set:{products:filteredCart}}, {new: true}, 
      (err, doc) => {
        if (err) {
            return res.status(500).json({
              msg:"Something wrong when updating data!"
            })
        }
    
        return res.status(200).json({
          data:doc
        })
    });
    })
  
  }
  exports.clearCart=(req,res,next)=>{
    const cartId = req.body._id
    Cart.findByIdAndRemove({_id:cartId}).then((resu)=>{
       res.status(200).json({
        msg:'you have cleared the card successfully',
        cart:null
      })
    }).catch((error)=>{
       res.status(500).json({
        msg:'you have an error with clear the card',
        error
      })
    })
  }
  //  product details
  exports.getProductDetails=(req,res,next)=>{
      const  productId = req.params.id
     return Product.findOne({_id:productId}).then((product)=>{
         res.status(200).json({product ,success:true});
      }).catch(err=>{
        res.status(400).json(err)
      })
      // res.send('DELTE SINGLE PRODUCT WITH THAT ID ',productId)
  }
  exports.homePage=(req,res,next)=>{
    Product.find({}).then((posts)=>{
          res.status(200).json({
            success:true,
            posts
            
          })
          
      }).catch(err=>{
        res.status(400).json({
          success:false,
          err
          
        })
        

      })

  }

  exports.searching=(req,res,next)=>{
    
    index.search(req.body.name).then((result)=>{
       console.log(' found',req.body.name);
       return res.status(200).json( result.hits)
     })
     .catch((error)=>{
     
       return  res.status(401).json(error)
     })
  
 }
const {cloudinary} = require('../cloudinary')

  exports.createReview=async(req,res,next)=>{
    const {title,description,userId,productId,rating,pic} = req.body
    let thePic = pic[0]
    try {
      const respo= await cloudinary.uploader.upload(thePic,{
        upload_preset:'byr4al94'})
        const newImage = respo.url
        const newReview = new Review({
          title,description,creatorId:userId,productId,photo:newImage,rating
        })
      const response = await Product.findOneAndUpdate({_id:productId},{rating:newReview._id})
      newReview.save()
     res.status(200).json({
      response,
      msg:'you have added a new review'
    })
      
    } catch (err) {
      console.log(err);
      res.status(400).json({
        err,
         msg:'you have an wrror with  added a new review'
       })
    }
  }
  exports.fetchReviews=(req,res,next)=>{
    const productId = req.params.productId
    Review.find({productId}).populate('creatorId').exec().then((review)=>{
      res.status(000).json({
        review,
        success:true
       })
    }).catch((err)=>{
      res.status(400).json({
        err,
         msg:'you have an wrror with getting review'
       })
    })
  }
  
  exports.userProducts=async(req,res,next)=>{
    const userId=req.params.userId
    try {
      const products = await Product.find({userId:userId})
      res.status(200).json({
        msg:'you have fetch your products',
        success:true,
        products
      })
      
    } catch (error) {
      res.status(400).json({error})
      
    }
  }
  
