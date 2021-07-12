var path = require("path");
const bycript = require("bcryptjs");
const Product = require(path.join(__dirname, "../../models/product"));
const User = require(path.join(__dirname, "../../models/user"));
const { cloudinary } = require("../cloudinary");

//  GET  USER`S data
exports.userData = (req, res, next) => {
  const userId = req.params.id;
  User.findOne({ _id: userId })
    .then((user) => {
      res.status(200).json({
        success: true,
        data: user,
      });
    })
    .catch((err) => {
      res.status(401).json({
        success: false,
        data: "null",
        err,
      });
    });
};
exports.updateUserData = async (req, res, next) => {
  const thePhoto = req.body.pic[0];
  const user = req.body.profile;
  const profile = req.body.profile;
  let pic;
  if (!thePhoto) {
    pic = profile.img;
  } else {
    pic = thePhoto;
  }
  try {
    const respo = await cloudinary.uploader.upload(pic, {
      upload_preset: "byr4al94",
    });
    const newImage = respo.url;
    const updateed = await User.findOneAndUpdate(
      { _id: user._id },
      { img: newImage, name: profile.name, email: profile.email }
    );
    console.log(updateed);
    res.status(200).json({
      msg: "yayayaya",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
    });
  }
};
// UPDATE USER PASSWORD
exports.changePassword = async (req, res, next) => {
    const email = req.body.email;
    const newpass = req.body.new;
    const old = req.body.old;
    const id = req.body.id;
    try {
      const user = await User.findOne({ _id: id, email: email });
  
      return bycript.compare(old, user.password).then((correct) => {
        if (!correct) {
          console.log("not correct");
          return res.status(404).json({
            success: false,
            msg: "your password is wrong",
          });
        }
        console.log("correct");
        bycript.hash(newpass, 12, (err, hashedpassword) => {
          if (err) {
            res.status(401).json({
              user: "there is no user",
              success: false,
              err,
            });
          }
          user.password = hashedpassword;
          return user.save().then(() => {
            res.status(200).json({
              user,
              success: true,
              msg: "you have changed your password succefully",
            });
          });
        });
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        error,
      });
    }
  };
  
  // products for specific user
  exports.userProductsAdmin = (req, res, next) => {
    const userId = req.params.id;
    Product.find({ userId: userId })
      .then((products) => {
        if (products.length == 0) {
          return res.status(500).json({
            msg: "you have not added products ",
          });
        }
        return res.status(200).json({
          products,
        });
      })
      .catch((err) => {
        return res.status(400).json({
          err,
          success: false,
        });
      });
  };

  exports.userProducts=async(req,res,next)=>{
    const userId=req.params.userId
    try {
      const products = await Product.find({userId:userId})
      res.status(200).json({
        msg:'you have fetch your products',
        success:true,
        products
      })
      
    } catch (error) {
      res.status(400).json({error})
      
    }
  }
  
