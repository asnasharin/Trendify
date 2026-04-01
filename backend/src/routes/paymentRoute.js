const express = require("express")
const  { paymentController, sendStripeApiKey } = require("../controllers/paymentController.js");
const { protect } = require("../middlewares/authMiddleware.js");

const route = express.Router()

route.post("/payment/process", paymentController);
route.get("/stripeapiKey", sendStripeApiKey)


module.exports = route;