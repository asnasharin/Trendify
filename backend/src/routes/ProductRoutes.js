const express = require("express");

const {
  createProductController,
  deleteProductController,
  getAllProduct,
  getAllProductsAdmin,
  getProductDetails,
  updateProduct,
} = require("../controllers/productController");

const { isAdmin, protect } = require("../middlewares/authMiddleware");

const route = express.Router();

// Admin routes
route.post("/admin/create-product", protect, isAdmin, createProductController);
route.get("/admin/products", protect, isAdmin, getAllProductsAdmin);
route.put("/admin/update-prod/:id", protect, isAdmin, updateProduct);
route.delete("/admin/delete-prod/:id", protect, isAdmin, deleteProductController);

// Public routes
route.get("/get-product", getAllProduct);
route.get("/product/:id", getProductDetails);

module.exports = route;