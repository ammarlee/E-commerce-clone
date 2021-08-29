const path=require('path')
const Category = require(path.join(__dirname, "../../models/category"));
const { cloudinary } = require("../cloudinary");
const Socket = require(path.join(__dirname, "../../socket"));
const clody = require("../cloud");

exports.editCategory = async(req,res,next)=>{
  let categoryData = JSON.parse(req.body.category);
  let {name,description,_id} = categoryData;
  const files = req.files;
  let imgUrl
 
    try {
      if (files.length < 0) {
        const category = await Category.findOneAndUpdate({_id},{name,description},{new:true})
        Socket.getIO().emit("category", { action: "editCategory", category: category });
        res.status(200).json({category,success: true,msg:'you have updated'})
        
      }else {
        const uploader = async (path) => await clody.uploads(path);
        let urls = [];
        for (let file of files) {
          const { path } = file;
          const newpath = await uploader(path);
          urls.push(newpath);
        }
         imgUrl = urls.map((p) => {
          return p.url;
        });

        const category = await Category.findOneAndUpdate({_id},{name,description,img:imgUrl[0]},{new:true})
        Socket.getIO().emit("category", { action: "editCategory", category: category });
        res.status(200).json({category,success: true,msg:'you have updated'})
      }
  } catch (error) {
    res.status(400).json({ error, success: false });
    
  }
}
exports.createCategory = async(req, res, next) => {
  let categoryData = JSON.parse(req.body.category);
  let {name,description} = categoryData;
  const files = req.files;
  let imgUrl
 
    try {
      if(files && files.length > 0) {

        const uploader = async (path) => await clody.uploads(path);
        let urls = [];
        for (let file of files) {
          const { path } = file;
          const newpath = await uploader(path);
          urls.push(newpath);
        }
         imgUrl = urls.map((p) => {
          return p.url;
        });
        const category = new Category({ name,description,img:imgUrl[0] });
        const newone = await category.save();
        Socket.getIO().emit("category", { action: "create", category: newone });
        res.status(200).json({ category:newone, success: true,msg:"create new one" });
      }else{
        res.status(404).json({msg:'you have to upload photo'})
      }
    } catch (error) {
      res.status(400).json({ error, success: false });
    }
  };
  
  exports.getCategory = (req, res, next) => {
    Category.find({}).lean()
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