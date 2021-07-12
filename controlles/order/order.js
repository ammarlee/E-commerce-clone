
var path = require('path');
const Order = require(path.join(__dirname,'../../models/order'))
const fs = require("fs");
const PDFDocument = require("pdfkit");


exports.makeOrder=async (req,res,next)=>{
    const userId = req.body.cart.userId
    const {cart,total,location}=req.body
    console.log(location);
    let date = new Date()
    try {
      const newOrder = await Order.create({
        userId,
        items:{products:cart.products,total:total,date},
        orderLocation:location,
      })
      const  newOne = await newOrder.save()
      console.log(newOne);
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
    let orders = await Order.find({userId}).sort({"items.date": -1})
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
    exports.downloadOrders = (req, res, next) => {
        const orders = req.body.orders;
        const name = "order_" + orders.products[0]._id + ".pdf";
        var dir = path.join("./orders");
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }
        const pathName = path.join(__dirname, "../", "../", dir, name);
      
        let i = [];
        const edit = orders.products.forEach((p) => {
          return i.push(p);
        });
        const pdfDoc = new PDFDocument();
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", 'inline;filename="' + name + '" ');
        pdfDoc.pipe(fs.createWriteStream(pathName));
        pdfDoc.pipe(res);
        pdfDoc.fontSize(25).text("Details for your Orders ", 100, 100);
        pdfDoc.text("_________________________");
        pdfDoc.text(`price :${orders.total} 
      ________________________________________`);
        i.forEach((item) => {
          pdfDoc.text(`
        name : ${item.name} 
        price : ${item.price} 
        quantity : ${item.quantity} 
        description : ${item.description} 
        -----------------------------------
        `);
        });
      
        pdfDoc.end();
      
      var file = fs.createReadStream(pathName)
          file.pipe(res);
         
      
        // res.status(200).json({pdfDoc,msg:"File is ready"})
      };
    