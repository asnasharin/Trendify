import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../Api/api";

// addtoCart
export const addToCart = createAsyncThunk(
    "cart/addtocart",
    async ({id, quantity}, thunkApi) => {
        try {
            const response = await api.get(`/product/${id}`);
            
            console.log("API Response cart:", response.data);
            const productData = response.data.product;
            
            return {
                productId: productData._id,
                name: productData.name,
                price: productData.price,
                image: productData.images[0]?.url,
                stock: productData.stock,
                quantity,
            }
        } catch (error) {
            if (error.response) {
                let payload = {
                    message: error.message.data.message || "An error occured",
                    status: error.message.status,
                };
                return thunkApi.rejectWithValue(payload);
            } else {
                let payload = {
                    message: error.message,
                    status: error.status || 500,
                };
                return thunkApi.rejectWithValue(payload);
            }
        }
    }
);

// remove cart item
export const removeFromCart = createAsyncThunk(
    "cart/removeItemfromCart",
    async (id, thunkApi) => {
        try {
            return id;
        } catch (error) {
            let payload = {
                message: "An error occured",
                status: 500,
            };
            return thunkApi.rejectWithValue(payload);
        }
    }
);