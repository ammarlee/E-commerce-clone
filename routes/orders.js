const path = require("path");
const express = require("express");
const router = express.Router();
const orderController = require(path.join(
  __dirname,
  "../controlles/order/order"
));
const { protect, restrictRoutes } = require(path.join(
  __dirname,
  "./protect/protect"
));

router.post(
  "/changestate",
  protect,
  restrictRoutes("admin"),
  orderController.changeOrderState
);
router.post("/download", orderController.downloadOrders);
router.post("/make/makeOrder", orderController.makeOrder);
router.get("/get/orders/:id", protect, orderController.getUserOrders);
router.get("/get/single-order/:id", protect, orderController.getSingleOrder);

module.exports = router;
