import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../Reducers/UserReducer";
import ProductReducer from "../Reducers/ProductReducer";
import CartReducer from "../Reducers/CartReducer";

const store = configureStore({
    reducer: {
        user: UserReducer,
        products: ProductReducer,
        cart: CartReducer,
    }
})

export default store;