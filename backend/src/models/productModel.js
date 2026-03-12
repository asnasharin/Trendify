const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
         description: {
        type: String,
        required: true,
   
         },
    price: {
        type: Number,
        required: true,
    },
    ratings: {
        type: Number,
        default: 0,
    },
    images: [
        {
              product_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],

    category: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        default: 1,
    },
    numOfReviews: {
        type: Number,
        default: 0,  
    },
    
    reviews: [
        {
            userId: {
                type: mongoose.Schema.ObjectId,
                ref: "userModel",
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            ratings: {
                type: Number,
                required: true,
            },
            title: {
                type: String,
                required: true,
            },
            recommended: {  
                type: Boolean,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
            avatar: {
                type: String,
                required: true,
            },
        },
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "userModel",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

});


module.export = mongoose.model("product", productSchema)