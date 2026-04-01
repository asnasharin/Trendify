import { createSlice } from "@reduxjs/toolkit";
import { createProduct, createReview, DeleteProduct, deleteReview, getAdminProducts, getAllReviews, getProductDetails, getProducts, updateProduct } from "../Actions/productAction";

const initialUserState = {
    products: [],
    error: null,
    loading: false,
};

const initialAdminState = {
    products: [],
    error: null,
    loading: false,
    success: false,
};

const initialProductDetailsState = {
    product: {},
    reviews: [], 
    error: null,
    loading: false,
};

const productSlice = createSlice({
    name: "products",
    initialState: {
        user: initialUserState, 
        admin: initialAdminState,
        productDetails: initialProductDetailsState,
    },
    reducers: {
        clearErrors: (state) => {
            state.user.error = null;
            state.admin.error = null;
            state.productDetails.error = null;
        },
        clearSuccess: (state) => {
            state.admin.success = false;
        }
    },
    extraReducers: (builder) => {
        // User Products
        builder
            .addCase(getProducts.pending, (state) => {
                state.user.loading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.user.loading = false;
                state.user.products = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.user.loading = false;
                state.user.error = action.payload;
            });

        // Admin Products
        builder
            .addCase(getAdminProducts.pending, (state) => {
                state.admin.loading = true;
            })
            .addCase(getAdminProducts.fulfilled, (state, action) => {
                state.admin.loading = false;
                state.admin.products = action.payload;
            })
            .addCase(getAdminProducts.rejected, (state, action) => {
                state.admin.loading = false;
                state.admin.error = action.payload;
            });

        // Admin Delete Product
        builder
            .addCase(DeleteProduct.pending, (state) => {
                state.admin.loading = true;
            })
            .addCase(DeleteProduct.fulfilled, (state, action) => {
                state.admin.loading = false;
                if (Array.isArray(state.admin.products)) {
                    state.admin.products = state.admin.products.filter(
                        (product) => product._id !== action.meta.arg
                    );
                } 
            })
            .addCase(DeleteProduct.rejected, (state, action) => {
                state.admin.loading = false;
                state.admin.error = action.payload;
            });

        // Admin Create Product
        builder
            .addCase(createProduct.pending, (state) => {
                state.admin.loading = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.admin.loading = false;
                state.admin.products = action.payload;
                state.admin.error = null;  
                state.admin.success = true;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.admin.loading = false;
                state.admin.error = action.payload;
                state.admin.success = false;
            });
            // Handling product details
        builder
            .addCase(getProductDetails.pending, (state) => {
            state.productDetails.loading = true;
            })
            .addCase(getProductDetails.fulfilled, (state, action) => {
            state.productDetails.loading = false;
            state.productDetails.product = action.payload;
            })
            .addCase(getProductDetails.rejected, (state, action) => {
            state.productDetails.loading = false;
            state.productDetails.error = action.payload;
            });

            // Handling product update
            builder
                .addCase(updateProduct.pending, (state) => {
                state.admin.loading = true;
                })
                .addCase(updateProduct.fulfilled, (state, action) => {
                    state.admin.products = action.payload;
                    state.admin.loading = false;
                    state.admin.success = true;
                    state.admin.error = null;
                })
                .addCase(updateProduct.rejected, (state, action) => {
                state.admin.loading = false;
                state.admin.error = action.payload;
                state.admin.success = false;
                });

                // create review
                builder
                .addCase(createReview.pending, (state) => {
                    state.productDetails.loading = true;
                }) 
                .addCase(createReview.fulfilled, (state, action) => {
                    state.productDetails.loading = false;
                    state.productDetails.product.reviews = action.payload;
                    state.productDetails.error = null;
                })
                .addCase(createReview.rejected, (state, action) => {
                    state.productDetails.loading = false;
                    state.productDetails.error = action.payload;
                });
                // getall review
                builder
                .addCase(getAllReviews.pending, (state, action) => {
                    state.productDetails.loading = true;
                })
                .addCase(getAllReviews.fulfilled, (state, action) => {
                    state.productDetails.loading = false;
                    state.productDetails.reviews  = action.payload.reviews;
                })
                .addCase(getAllReviews.rejected, (state, action) => {
                    state.productDetails.loading = false;
                    state.productDetails.error = action.payload;
                })
                // delete review
                builder
                .addCase(deleteReview.pending, (state) => {
                    state.productDetails.loading = true;
                })
                .addCase(deleteReview.fulfilled, (state, action) => {
                    state.productDetails.loading = false;
                    state.productDetails.reviews = state.productDetails.reviews.filter(reviews => reviews.id !== action.payload.id);
                })
                .addCase(deleteReview.rejected, (state, action) => {
                    state.productDetails.loading = false;
                    state.productDetails.error = action.payload;
                })
       },
});

export const { clearErrors } = productSlice.actions;
export default productSlice.reducer;
