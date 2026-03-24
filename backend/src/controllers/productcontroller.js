const asyncHandler = require("express-async-handler");
const  ProductModel = require("../models/productModel.js");
const cloudinary = require("cloudinary")

// create product
exports.createProductController = asyncHandler (
    async (req, res) => {
        let images = [];

        if (req.body.images) {
            if (typeof req.body.images === "string") {
                images.push(req.body.images);
            } else {
                images = req.body.images;
            }

            const imagesLinks = [];

            const chunksize = 3;
            const imageChunks = [];
            while (images.length > 0) {
                imageChunks.push(images.splice(0, chunksize));
            }

            for (let chunk of imageChunks) {
                const uploads = chunk.map((img) => 
                    cloudinary.v2.uploader.upload(img, {
                        folder: "Products",
                    })
                );

                const results = await Promise.all(uploads);

                for(let result of results) {
                    imagesLinks.push({
                        product_id: result.public_id,
                        url: result.secure_url,
                    });
                }
            }

            req.body.user = req.user.id;
            req.body.images = imagesLinks;
        }

        const data = await ProductModel.create(req.body);

        res.status(200).json({
            success: true,
            data: data
        });
    }
)


// get all product admin
exports.getAllProductsAdmin = asyncHandler(async (req, res) => {
    const data = await ProductModel.find({});

    res.status(200).json({
        success: true,
        message: "get all products",
        data
    });
});


// getall product 
exports.getAllProduct = asyncHandler(
    async (req, res) => {
        try {
            const { price, category, ratings } = req.query;
        let query = {};

        if (category) {
            query.category = category;
        }

        if (price) {
            const [min, max] = price.split(',');
            query.price = {$gte: Number(min), $lte: Number(max) };
        }

        if (ratings) {
            query.ratings = { $gte: Number(ratings) };
        }

        const data = await ProductModel.find(query);

        res.status(200).json({
            success: true,
            count: data.length,
            data,
        });

        } catch (error) {
           res.status(500).send({
            success: false,
            message: error.message
           }) 
        }
    } 
)



exports.updateProduct = asyncHandler(
    async (req, res, next) => {
        const product = await ProductModel.findById(req.params.id);

        if (!product) {
            return next(new Error("Product not found", 404)); 
        }

        let images = [];

        // Handle image URLs
        if (req.body.images) {
            if (typeof req.body.images === "string") {
                images.push(req.body.images);
            } else {
                images = req.body.images;
            }
        }

        console.log("Images Array:", images);

        // Check if images need to be updated
        if (images.length > 0) {
            for (let i = 0; i < product.images.length; i++) {
                const imageId = product.images[i].product_id;

                if (typeof imageId === "string") {
                    console.log(`Deleting image: ${imageId}`);
                    await cloudinary.v2.uploader.destroy(imageId);
                } else {
                    console.error(`Invalid product_id: Expected a string but received`, typeof imageId);
                }
            }

            const imagesLinks = [];
            for (let img of images) {
                const result = await cloudinary.v2.uploader.upload(img.url, {
                    folder: "Products",
                });

                console.log("Uploaded Image Result:", result);

                imagesLinks.push({
                    product_id: result.public_id,
                    url: result.secure_url,
                });
            }

            req.body.images = imagesLinks;
        } else {
            req.body.images = product.images;
        }

        const updatedProduct = await ProductModel.findByIdAndUpdate(req.params.id, req.body.product, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }); 

        console.log("Updated Product:", updatedProduct);

        res.status(200).json({ 
            success: true,
            product: updatedProduct,
        });
    }
);


// delete product
exports.deleteProductController = asyncHandler(
    async (req, res, next) => {
        const product = await ProductModel.findById(req.params.id)

        if (!product) {
            return next(new Error("product not found"), 404);
        }

        // deleting image
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].product_id);
        }

        await ProductModel.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "deleted successfully!"
        })
    }
)

// get product details
exports.getProductDetails = asyncHandler (
    async (req, res, next) => {
        const id = req.params.id;

        const product = await ProductModel.findById(id);
        if(!product) {
            return next(new Error("product not found"), 404);
        } 
        res.status(200).send({
            success: true,
            product: product,
        })
    }
)