import express from "express"
import { paymentController, sendStripeApiKey } from "../controllers/paymentController.js";
import { protect } from "../middlewares/authMiddleware.js";

const route = express.Router()

route.post("/payment/process", paymentController);
route.get("/stripeapiKey", sendStripeApiKey)


export default route;