const mongoose = require("mongoose");
const Schema = mongoose.Schema
const userSchema = new Schema({
    name:{ 
        type: String ,
        required:true,
        unique:false
    },
    email: {
        type: String,
        required: true,
        unique:false
      },
      img:{
        type: String,
      },
      password: {
        type: String,
        required: true,

      },
      phone: {
        type: Number,

      },
      resetToken:{
          type:String,
      },
      
    resetToken:{
        type:String,

    }  

})
userSchema.methods.addTocard = function(product) {
    console.log("this is the product will add it ",product);
    let index = this.cart.items.findIndex(p=>{
        return p.productId.toString() === product._id.toString()
    })
    console.log("this is the index  ",index);
    
    let newquantity = 1
    let singleProduct  = this.cart.items[index]
    let updatedProduct = [...this.cart.items]
    if (index >=0) {
        newquantity = singleProduct.quantity + 1    
        updatedProduct[index].quantity = newquantity
    }else {
        updatedProduct.push({
            productId : product._id,
            quantity:newquantity
        })
    }
    const updat = {
        items:updatedProduct
    }
    this.cart = updat
    return this.save()
},
userSchema.methods.deleteCardItem = function(id) {
    objectId = require('mongoose').Types.ObjectId;
    id =  new objectId(id)
    let products = this.cart.items.filter((p)=>{
       return p.productId.toString() !== id.toString()
    })
    this.cart.items = products
    return this.save() 
    
},
userSchema.methods.clearCard = function() {
    this.cart.items = []
        return this.save()
},
userSchema.methods.doWork = function() {
    console.log(`here we do work`);
},
module.exports = mongoose.model('User',userSchema)