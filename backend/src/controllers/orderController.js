const asyncHandler = require("express-async-handler");
const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");

exports.createOrder = asyncHandler(async (req, res) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
        return res.status(400).json({
            success: false,
            message: "No order items"
        });
    }

    let itemPrice = 0;

    for (let item of orderItems) {
        const product = await productModel.findById(item.product);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        itemPrice += product.price * item.quantity;
    }

    const taxPrice = itemPrice * 0.1;
    const shippingPrice = itemPrice > 1000 ? 0 : 50;
    const totalPrice = itemPrice + taxPrice + shippingPrice;

    const order = await orderModel.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        orderStatus: "Processing",
        user: req.user._id,
        paidAt: paymentInfo?.status === "succeeded" ? Date.now() : null,
    });

    res.status(201).json({
        success: true,
        order,
    });
});

// get single order

export const getSingleOrder = asyncHandler (
    async ( req, res, next) => {
        const order = await orderModel
        .findById(req.params.id)
        .populate({ path: "user", select: "name email"});
        
        if(!order) {
            return next(new Error("order not found"), 404);
        }

        res.status(200).json({
            success: true,
            order
        });
    }
)

// get users all order

export const myOrders = asyncHandler (
    async (req, res, next) => {
        const orders = await orderModel.find({ user: req.user._id}) 

        res.status(200).send({
            success: true,
            orders
        })
    }
) 

// getall orders admin

export const getAllOrders = asyncHandler(
    async(req, res, next) => {
        const orders = await orderModel.find()

        let totalAmount = 0;
        orders.forEach((order) => {
            totalAmount += order.totalPrice;
        });

        res.status(200).send({
            success: true,
            totalAmount,
            orders
        });
    }
)

// update order admin

export const updateOrder = asyncHandler (
    async (req, res, next) => {
        const order = await orderModel.findById(req.params.id);

        if(!order) {
            return next(new Error("no order found"), 400);
        }

        if(order.status === "Delivered") {
            return next(new Error("You have already delivered the order"), 400);
        }

        if (req.body.status === "Shipped") {
            order.orderItems.forEach(async (orderItem) => {
                await updateStock(orderItem.productId, orderItem.quantity);
            });
        }

            order.orderStatus = req.body.status;

            if(order.orderStatus === "Delivered") {
                order.deliveredAt = Date.now();
            }

            await order.save({ validateBeforeSave: false });
            res.status(200).json({
                success: true,
            });
    }
)

async function updateStock(id, quantity) {
    try {
        const product = await ProductModel.findById(id);
        if(!product) {
            throw new Error("product not found", 404);
        }

        product.stock -= quantity;
        await product.save({ validateBeforeSave: false });
    } catch (error) {
        throw new Error("product not found", 404)
    }
}

// delete order
export const deleteOrder = asyncHandler (
    async (req, res, next) => {
        const order = await orderModel.findById(req.params.id)

        if(!order) {
            return next(new Error("order not found"), 404);
        }
        await order.deleteOne();

        res.status(200).json({
            success: true,
            message: "deleted successfully"
        })
    }
)