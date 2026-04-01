import { createSlice } from "@reduxjs/toolkit";
import { addToCart, removeFromCart } from "../Actions/CartActions";

const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
const initialState = {
    cartItems: storedCartItems,
    loading: false,
    error: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.error = {
                message: "",
                status: null,
            };
        },
    },  
    extraReducers: (builder) => {
        builder
        .addCase(addToCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addToCart.fulfilled, (state, action) => {
            state.loading = false;
            const item = action.payload;
    
            const existItemIndex = state.cartItems.findIndex((i) => i.productId === item.productId);
                console.log("existing item index", existItemIndex);

                if (existItemIndex !== -1) {
                    state.cartItems[existItemIndex].quantity = item.quantity;
                } else {
                    state.cartItems.push(item);
                }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        })
        .addCase(addToCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(removeFromCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(removeFromCart.fulfilled, (state, action) => {
            state.loading = false;
            console.log("Remove from Cart Payload:", action.payload); 
            state.cartItems = state.cartItems.filter((i) => i.productId !== action.payload);

            console.log("Updated Cart Items after Remove:", state.cartItems); 
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        })
        .addCase(removeFromCart.rejected, (state, action) => {
            state.loading = false;
            console.error("Remove from Cart Error:", action.payload); 
            state.error = action.payload;
        });
    }
});

export default cartSlice.reducer;
