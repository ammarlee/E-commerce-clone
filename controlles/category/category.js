const path = require("path");
const Category = require(path.join(__dirname, "../../models/category"));
const Socket = require(path.join(__dirname, "../../socket"));
const clody = require("../cloud");
const {uploadImg} = require('./uploader')

exports.addSubChildTOCategory =async (req, res, next) => {
  try {
    const {categoryId,img,name} =req.body
    if (!img) {
    res.status(400).json({ error, success: false,msg: 'please upload image'});
    }
    let newuploaderimg = await uploadImg(img)
    const category = await Category.findByIdAndUpdate(
      { _id: categoryId },
      { $push: { subCategory:{name,img:newuploaderimg.img}} },
      { new: true }
    );
    Socket.getIO().emit("category", {
      action: "editCategory",
      category: category,
    });
    res
      .status(200)
      .json({ Category, success: true, msg: "you have add sub child to chategory" });

    
  } catch (error) {
    res.status(400).json({ error, success: false });
    
  }
}
exports.deleteSubChildCategory = async (req,res,next)=>{
try {
  const {subId,categoryId} =req.body
  const category = await Category.findOneAndUpdate(
    { _id:categoryId },
    { $pull: { subCategory: {_id:subId}} },
    { new: true }
  );
  res
  .status(200)
  .json({ category, success: true, msg: "you have delete sub child to chategory" });
} catch (error) {
  res.status(400).json({ error, success: false });
  
}
}
exports.editSubChildCategory= async (req, res, next) => {
  try {
    const {_id,img,categoryId,name}= req.body
    let newuploaderimg = await uploadImg(img)
    
      const category = await Category.findOneAndUpdate(
        {
          _id: categoryId,
          subCategory: {
            $elemMatch: {
              _id,
            },
          },
        },
        {
          $set: {
            "subCategory.$.name": name,
            "subCategory.$.img": newuploaderimg.img,
           
          },
        },
        { new: true }
      );
    res
    .status(200)
    .json({ category, success: true, msg: "you have updated sub child" });

    
  } catch (error) {
  res.status(400).json({ error, success: false });
    
  }
}
exports.editCategory = async (req, res, next) => {
  let { name, description, _id } = req.body.category;
  let newimg = req.body.img;
  let imgUrl;

  try {
    if (!newimg) {
      const category = await Category.findOneAndUpdate(
        { _id },
        { name, description },
        { new: true }
      );
      Socket.getIO().emit("category", {
        action: "editCategory",
        category: category,
      });
      res
        .status(200)
        .json({ category, success: true, msg: "you have updated" });
    } else {
    let newuploaderimg = await uploadImg(newimg)
      const category = await Category.findOneAndUpdate(
        { _id },
        { name, description, img: newuploaderimg.img },
        { new: true }
      );
      Socket.getIO().emit("category", {
        action: "editCategory",
        category: category,
      });
      res
        .status(200)
        .json({ category, success: true, msg: "you have updated" });
    }
  } catch (error) {
    res.status(400).json({ error, success: false });
  }
};
exports.createCategory = async (req, res, next) => {
  let { name, description } = req.body.category;
  let img = req.body.img;
  try{ 
  if (!img) {
    res.status(404).json({ msg: "you have to upload photo" });
    
  }else{
    let newuploaderimg = await uploadImg(img)
    const category = new Category({ name, description, img: newuploaderimg.img});
    const newone = await category.save();
    Socket.getIO().emit("category", { action: "create", category: newone });
    res
      .status(200)
      .json({ category: newone, success: true, msg: "create new one" });
  }

  } catch (error) {
    res.status(400).json({ error, success: false });
  }
};

exports.getCategory = async (req, res, next) => {
  try {
    const categoryies = await Category.find({}).lean();
    res.status(200).json({ cat: categoryies, success: true });
  } catch (error) {
    res.status(400).json({ err, success: false });
  }
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
