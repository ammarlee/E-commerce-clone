var path = require("path");
const Product = require(path.join(__dirname, "../../models/product"));
const Socket = require(path.join(__dirname, "../../socket"));
const { imgUploader } = require("./imgUploader");

// create PRODUCT
exports.CreateProduct = async (req, res, next) => {
  let data = JSON.parse(req.body.data);
  let user = JSON.parse(req.body.user);
  const files = req.files;
  let { name, price, quantity, category,subChildCategory, description, size, color, gender } =
    data;
  let product;
  let productData = {
    name,
    price,
    quantity,
    category,
    description,
    userId: user._id,
    size,
    color,
    gender,
    subChildCategory
  };
  try {
    if (files && files.length > 0) {
      const images = await imgUploader(files);
      productData.img = images;
      product = new Product(productData);
    } else {
      product = new Product(productData);
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
  let { name, price, quantity, category, description, subChildCategory,size, color, gender } =
    product;
  let productData = {
    name,
    price,
    quantity,
    description,
    category,
    size,
    color,
    subChildCategory,
    gender,
  };
  let edited;
  try {
    const files = req.files;
    if (files && files.length > 0) {
      const images = await imgUploader(files);
      productData.img = images;
      edited = await Product.findOneAndUpdate(
        { _id: product._id },
        { $set: productData },
        { new: true }
      );
    } else {
      edited = await Product.findOneAndUpdate(
        { _id: product._id },
        { $set: productData },
        { new: true }
      );
    }
    res.status(200).json({
      success: true,
      post: edited,
      msg: "you have edited product",
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      msg: "you coludnt  have edit the product",
    });
  }
};
// delete product
exports.deleteProduct =async (req, res, next) => {
  const productId = req.params.id;
  try {
    const product = await Product.findOneAndRemove({ _id: productId })
    Socket.getIO().emit("category", { action: "deleteProduct", product });
    res.status(200).json({
      success: true,
      msg: "you have deleted product",
      product,
    });
    
  } catch (error) {
    res.status(401).json({
      success: false,
      msg: "you coludnt  have deleted the product",
    });
    
  }
  
};
