const express = require("express");

const {
  createProductReview,
  deleteReview,
  getAllReviews,
} = require("../controllers/reviewController");

const { isAdmin, protect } = require("../middlewares/authMiddleware");

const route = express.Router();

route.get("/reviews/:id", getAllReviews);

route.post("/product/review/new", protect, createProductReview);

route.delete("/review/delete", protect, isAdmin, deleteReview);

module.exports = route;