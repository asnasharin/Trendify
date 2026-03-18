const asyncHandler = require("asyncHandler");
const orderModel = require("../models/orderModel")


export const createOrder = asyncHandler(
    async(req, res) => {
        const {
            shippingInfo,
            orderItems,
            paymentInfo,
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            orderStatus
        } = req.body

        const order = await orderModel.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            orderStatus,
            user : req.user._id,
            paidAt: Date.now(),
        })

        res.status(200).send({
            success: true,
            order
        })
    }
)


// get single order

export const getSingleOrder = asyncHandler (
    async ( req, res, next) => {
        const order = await OrderModel
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
        const orders = await OrderModel.find({ user: req.user._id}) 

        res.status(200).send({
            success: true,
            orders
        })
    }
) 

// getall orders admin

export const getAllOrders = asyncHandler(
    async(req, res, next) => {
        const orders = await OrderModel.find()

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
        const order = await OrderModel.findById(req.params.id);

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
        const order = await OrderModel.findById(req.params.id)

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