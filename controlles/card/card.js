var path = require('path');
const Product =require(path.join(__dirname,'../../models/product'))
const Cart =require(path.join(__dirname,'../../models/cart'))



 // POST A NEW ITEMS TO THE CARD 
 exports.addToCart=async (req,res,next)=>{
    const {name,price,quantity,description,category,user} =req.body
          const img = req.body.img[0]
          const productId = req.body._id
          console.log(`product id ${productId}`);

          if (!user) {
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
          console.log('exist');
          let productItem = cart.products[itemIndex];
          productItem.quantity += 1;
          cart.products[itemIndex] = productItem;
        } else {
          console.log(' not exist !');

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
  
  exports.increaseCard = async (req,res,next)=>{
    const {productId,quantity,userId} = req.body

    let cart = await Cart.findOne({ userId });
    if (cart) {
      let itemIndex = cart.products.findIndex(p => p.productId == productId);
      if (itemIndex > -1) {
        let productItem = cart.products[itemIndex];
        productItem.quantity += 1;
        cart.products[itemIndex] = productItem;
      }
      cart = await cart.save();
      return res.status(201).send(cart);
    }
  }
  exports.decreaseCard = async (req,res,next)=>{
    const {productId,userId} = req.body

    let cart = await Cart.findOne({ userId });
    if (cart) {
      let itemIndex = cart.products.findIndex(p => p.productId == productId);
      if (itemIndex > -1) {
        let productItem = cart.products[itemIndex];
        productItem.quantity -= 1;
        cart.products[itemIndex] = productItem;
      }
      cart = await cart.save();
      return res.status(201).send(cart);
    }
  }
  exports.setQuantity = async (req,res,next)=>{
    const {productId,userId,quantity} = req.body

    let cart = await Cart.findOne({ userId });
    if (cart) {
      let itemIndex = cart.products.findIndex(p => p.productId == productId);
      if (itemIndex > -1) {
        let productItem = cart.products[itemIndex];
        productItem.quantity = quantity;
        cart.products[itemIndex] = productItem;
      }
      cart = await cart.save();
      return res.status(201).send(cart);
    }
  }
  
  exports.getUserCart=(req,res,next)=>{
      let userId = req.params.id
      Cart.findOne({userId}).then((card)=>{
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
