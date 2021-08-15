var path = require("path");
const Product = require(path.join(__dirname, "../../models/product"));
const clody = require("../cloud");
const Socket = require(path.join(__dirname, "../../socket"));
 
// create PRODUCT
exports.CreateProduct = async (req, res, next) => {
  let data = JSON.parse(req.body.data);
  let user = JSON.parse(req.body.user);
  let { name, price, quantity, category, description } = data;
  let product 
  try {
  if(files && files.length > 0) {

    const uploader = async (path) => await clody.uploads(path);
    let urls = [];
    const files = req.files;
    for (let file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      urls.push(newpath);
    }
    const images = urls.map((p) => {
      return p.url;
    });
     product = new Product({
      name,
      price,
      quantity,
      img: images,
      category,
      description,
      userId: user._id,
    });
  }else{
    product = new Product({
      name,
      price,
      quantity,
      category,
      description,
      userId: user._id,
    });

  }
    const products = await product.save();
    Socket.getIO().emit("category", {
      action: "createProduct",
      product: products,
      msg: "new product has been added ",
    });
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(400).json({ error, success: false });
  }
};
// EDIT PRODUCT
exports.editProduct = async (req, res, next) => {
  let product = JSON.parse(req.body.product);
  let user = JSON.parse(req.body.user);
  let { name, price, quantity, category, description } = product;
  let edited
  
  try {
    const files = req.files;
    if(files && files.length > 0) {
      const uploader = async (path) => await clody.uploads(path);
      let urls = [];

      for (let file of files) {
        const { path } = file;
        const newpath = await uploader(path);
        urls.push(newpath);
      }
      const images = urls.map((p) => {
        return p.url;
      });
       edited = await Product.findOneAndUpdate(
        { _id: product._id },
        { $set: { name, img: images, price, quantity, description, category } },
        { new: true }
      );
     
    } else{
       edited = await Product.findOneAndUpdate(
        { _id: product._id },
        { $set: { name, price, quantity, description, category } },
        { new: true }
      );
      
      
    }
    res.status(200).json({
      success: true,
      post:edited,
      msg: "you have edited product",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      msg: "you coludnt  have edit the product",
    });
  }
};
// delete product
exports.deleteProduct = (req, res, next) => {
  const productId = req.params.id;
  return Product.findOneAndRemove({ _id: productId })
    .then((product) => {
      Socket.getIO().emit("category", { action: "deleteProduct", product });
      res.status(200).json({
        success: true,
        msg: "you have deleted product",
        product,
      });
    })
    .catch((err) => {
      res.status(401).json({
        success: false,
        msg: "you coludnt  have deleted the product",
      });
    });
  git };


