var path = require("path");
const Product = require(path.join(__dirname, "../../models/product"));
const clody = require("../cloud");
const Socket = require(path.join(__dirname, "../../socket"));

// create PRODUCT
exports.CreateProduct = async (req, res, next) => {
  let d = JSON.parse(req.body.data);
  let user = JSON.parse(req.body.user);
  let { name, price, quantity, category, description } = d;
  try {
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
    const product = new Product({
      name,
      price,
      quantity,
      img: images,
      category,
      description,
      userId: user._id,
    });
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
  let d = JSON.parse(req.body.product);
  let user = JSON.parse(req.body.user);
  let { name, price, quantity, category, description } = d;
  try {
    const uploader = async (path) => await clody.uploads(path);
    let urls = [];
    const files = req.files;
    console.log(files);
    for (let file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      urls.push(newpath);
    }
    const images = urls.map((p) => {
      return p.url;
    });
    const edited = await Product.findOneAndUpdate(
      { _id: user._id },
      { $set: { name, img: images, price, quantity, description, category } },
      { new: false }
    );
    console.log(edited);
    res.status(200).json({
      success: true,
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
exports.deleteProduct = (req, res, next) => {
  const productId = req.params.id;
  console.log(productId);
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
  // res.send('DELTE SINGLE PRODUCT WITH THAT ID ',productId)
};


