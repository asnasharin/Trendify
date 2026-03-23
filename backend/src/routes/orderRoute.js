const express = require("express");

const { isAdmin, protect } = require("../middlewares/authMiddleware");
const {
  createOrder,
  deleteOrder,
  getAllOrders,
  getSingleOrder,
  myOrders,
  updateOrder,
} = require("../controllers/orderController");

const route = express.Router();

route.post("/order/create", protect, createOrder);
route.get("/order/:id", protect, getSingleOrder);
route.get("/orders/myorder", protect, myOrders);
route.get("/admin/orders", protect, isAdmin, getAllOrders);
route.put("/admin/order/:id", protect, isAdmin, updateOrder);
route.delete("/admin/order/delete/:id", protect, isAdmin, deleteOrder);

module.exports = route;