const path = require("path");
const express = require("express");
const router = express.Router();
const adminController = require(path.join(
  __dirname,
  "../controlles/admin/admin"
));
const {protect,restrictRoutes} =require(path.join(__dirname,'./protect/protect')) 

const upload = require(path.join(__dirname, "../controlles/multer"));

router.post(
  "/file-upload",
  protect,
  restrictRoutes("admin"),
  upload.array("files", 10),
  adminController.CreateProduct
);
router.post(
  "/file/edit/:id",
  protect,
  restrictRoutes("admin"),
  upload.array("files", 10),
  adminController.editProduct
);
router.post(
  "/:id",
  protect,
  restrictRoutes("admin"),
  adminController.deleteProduct
);

module.exports = router;
