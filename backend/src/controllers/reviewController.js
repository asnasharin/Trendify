const asyncHandler = require("express-async-handler");
const ProductModel = require("../models/productModel");

// get all reviews
export const getAllReviews = asyncHandler(
    async(req, res, next) => {
        const reviews = await ProductModel.findById(req.params.id);

        if(!reviews) {
            return next(new Error("no priduct found"), 404);
        }

        res.status(200).send({
            success: true,
            reviews: reviews.reviews
        })
    }
)

// update review
export const createProductReview = asyncHandler(
    async (req, res, next) => {

        const { title, productId, ratings, recommended } = req.body;
           
        const review = {
            userId: req.user._id,
            name: req.user.name,
            ratings: Number(ratings),
            title: title,
            // comment: comment,
            recommended: recommended,
            // avatar: req.user.avatar.url,
        };

        const product = await ProductModel.findById(productId);

        const isReviewed = product.reviews.find((rev) => {
            return rev.userId.toString() === req.user._id.toString();
        });

        if(isReviewed) {
            // updating existing review
            product.reviews.forEach((rev) => {
                if (rev.userId.toString() === req.user._id.toString()) {
                    rev.ratings = ratings;

                    rev.recommended = recommended;
                    rev.title = title;
                    product.numOfReviews = product.reviews.length;
                }
            });
        } else {
            // add new review
            product.reviews.push(review);
            product.numOfReviews = product.reviews.length;
        }

        // calculating average rating
        let totalRating = 0;
        product.reviews.forEach((rev) => {
            totalRating += rev.ratings;
        });
        product.ratings = totalRating / product.reviews.length;

        await product.save({ validateBeforeSave: false });

        res.status(200).send({
            success: true,
            product
        });
    }
)

// delete review
export const deleteReview = asyncHandler(
    async( req, res, next) => {

        const product = await ProductModel.findById(req.query.product_id);

        if(!product) {
            return next(new Error("product not found"), 404);
        }

        const reviews = product.reviews.filter(
            (rev) => { return rev._id.toString() !== req.query.id.toString()}
        );

        let avg = 0;
        reviews.forEach((rev) => {
            avg += rev.ratings;
        });

        let ratings = 0;
        if (reviews.length === 0) {
            ratings = 0;
        } else {
            ratings = avg / reviews.length;
        }

        const numOfReviews = reviews.length;

        await ProductModel.findByIdAndUpdate (
            req.query.product_id,
            {
                reviews,
                ratings,
                numOfReviews
            },
            {
                new: true,
                runValidators: true,
                useFindAndModify: false,
              }
            );

            res.status(200).json({
                success: true
            })
    }
)