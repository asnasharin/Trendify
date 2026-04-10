const { Router } = require ("express");
const { createProductController, createProductReview, deleteProductController, deleteReview, getAllProduct, getAllProductsAdmin, getAllReviews, getProductDetails, updateProduct } = require("../controllers/productController.js");
const { isAdmin, protect } = require("../middlewares/authMiddleware.js");


const route = Router();

route.post("/admin/create-product",protect, createProductController);
route.get("/get-product", getAllProduct);
route.get("/admin/products",protect, isAdmin,getAllProductsAdmin);
route.put("/update-prod/:id",protect,  updateProduct);
route.delete("/admin/delete-prod/:id",protect, isAdmin, deleteProductController);
route.get("/product/:id", getProductDetails);
route.get("/reviews/:id", getAllReviews)
route.post("/product/review/new", protect, createProductReview);
route.delete("/review/delete", protect, isAdmin, deleteReview)

module.exports = route;