const path=require('path')
const Category = require(path.join(__dirname, "../../models/category"));
const { cloudinary } = require("../cloudinary");
const Socket = require(path.join(__dirname, "../../socket"));

exports.editCategory = async(req,res,next)=>{
  console.log('edit ');
  const {_id,name}=req.body
  console.log(_id,name);
  try {
    const category = await Category.findOneAndUpdate({_id},{name},{new:true})
    Socket.getIO().emit("category", { action: "edit", category: category });

    res.status(200).json({category,success: true,msg:'you have updated'})

    
  } catch (error) {
    console.log(error);
    res.status(400).json({ error, success: false });
    
  }
}
exports.createCategory = async(req, res, next) => {
  let name= req.body.name;
    try {
      const category = new Category({ name, });
      const newone = await category.save();
      Socket.getIO().emit("category", { action: "create", category: newone });
      res.status(200).json({ newone, success: true,msg:"create new one" });
    } catch (error) {
      res.status(400).json({ error, success: false });
    }
  };
  
  exports.getCategory = (req, res, next) => {
    Category.find({})
      .then((cat) => {
        res.status(200).json({ cat, success: true });
      })
      .catch((err) => {
        res.status(400).json({ err, success: false });
      });
  };
  exports.deleteCategory = (req, res, next) => {
    const id = req.params.id;
    Category.findOneAndRemove({ _id: id })
      .then((cat) => {
        Socket.getIO().emit("category", {
          action: "deleteCategory",
          category: cat,
        });
        res.status(200).json({ cat, success: true });
      })
      .catch((err) => {
        res.status(400).json({ err, success: false });
      });
  };