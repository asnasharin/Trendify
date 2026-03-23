const asyncHandler = require("express-async-handler");
const productModel = require("../models/productModel");
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const paymentController = asyncHandler(async (req, res) => {
    const { products } = req.body;

    if (!products || products.length === 0) {
        return res.status(400).json({
            success: false,
            message: "No Products Provided"
        });
    }

    let totalAmount = 0;

    for (let item of products) {

        if (item.quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid quantity"
            });
        }

        const product = await productModel.findById(item.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        totalAmount += product.price * item.quantity;
    }

    if (totalAmount <= 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid total amount"
        });
    }

    const payment = await stripe.paymentIntents.create({
        amount: totalAmount * 100,
        currency: "inr",
        metadata: { company: "Ecommerce" },
    });

    res.status(200).json({
        success: true,
        clientSecret: payment.client_secret,
    });
});