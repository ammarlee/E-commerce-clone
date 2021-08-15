var path = require('path');
const Product =require(path.join(__dirname,'../../models/product'))
const Review = require(path.join(__dirname,'../../models/review'))
const algoliasearch = require("algoliasearch");
const client = algoliasearch("SRG9R6FP41", "a10e35ddd54011feeb240cf013c0f9b0");
const index = client.initIndex("amazontest");
const nodeMailer = require('nodemailer')
const nodegride = require('nodemailer-sendgrid-transport')
const {cloudinary} = require('../cloudinary')
const transporter = nodeMailer.createTransport(nodegride({

  auth:{
    api_key:"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"
  }
}))


 
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
  
  exports.filterProduct=async(req,res,next)=>{
    let page=req.query.page *1 ||1;
    let limit=req.query.limit *1 ||5;
    let skip = (page-1) *limit;
    let categories = req.body.categories
    let query = { category: { $in: categories} }
    try {
      const count = await Product.find(query).count()
      const products = await  Product.find({ category: { $in: categories} }).skip(skip).limit(limit)
      res.status(200).json({
        success:true,
        products,
        hasNextPage :limit * page < count,
        hasPerviousPage :page >1,
        count,
        lastPage :Math.ceil(count / limit)
        
      })
      
    } catch (error) {
      res.status(400).json({
        success:false,
        error
      })
    }

    // Product.find(query).count().then(count=>{
    //   Product.find({ category: { $in: categories} }).skip(skip).limit(limit).then((products)=>{
    //     res.status(200).json({
    //       success:true,
    //       products,
    //       hasNextPage =limit * page < count,
    //       hasPerviousPage =page >1,
    //       count,
    //       lastPage = Math.ceil(count / limit)
          
    //     })
        
    // })
    // .catch(err=>{
     
      
    // })
    // })
   

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
       return res.status(200).json( result.hits)
     })
     .catch((error)=>{
       return  res.status(401).json(error)
     })
 }

  exports.createReview=async(req,res,next)=>{
    const {title,description,userId,productId,rating,} = req.body
    try {
        const newReview = new Review({
          title,description,creatorId:userId,productId,rating
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
  
