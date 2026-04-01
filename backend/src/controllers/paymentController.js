const asyncHandler = require("express-async-handler");
const Stripe = require("stripe");
const dotenv = require("dotenv")

dotenv.config();

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not defined in .env file");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.paymentController = asyncHandler(async (req, res) => {
    const { amount } = req.body;

    if (!amount) {
        res.status(400).json({ success: false, message: "Amount is required." });
        return;
    }

    try {
        const myPayment = await stripe.paymentIntents.create({
            amount,
            currency: "inr",
            metadata: { company: "Ecommerce" },
        });

        res.status(200).json({ success: true, clientSecret: myPayment.client_secret });
    } catch (error) {
        console.error("Stripe Error:", error.message);
        res.status(500).json({ success: false, message: "Payment processing failed." });
    }
});

// Controller to send the Stripe API key
exports.sendStripeApiKey = asyncHandler(async (req, res) => {
    if (!process.env.STRIPE_API_KEY) {
        res.status(500).json({ success: false, message: "STRIPE_API_KEY is missing." });
        return;
    }
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
