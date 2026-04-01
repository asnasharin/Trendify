import { createSlice } from "@reduxjs/toolkit";
import { login, signup } from "../Actions/userActions";

// Initial state
const user = localStorage.getItem("user");
const initialState = {
    loading: false,
    isAuthenticated: localStorage.getItem("token"),
    user: user ? JSON.parse(user) : null,
    errorMessage: {
        message: "",
        status: null,
    },
};

const userReducer = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            window.location.reload();
        },
        clearErrors: (state) => {
            state.errorMessage = {
                message: "",
                status: null,
            };
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(signup.pending, (state) => {
            state.loading = true;
            state.errorMessage = {
                message: null,
                status: null,
            };
        })
        .addCase(signup.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token", JSON.stringify(action.payload.token));
        })
        .addCase(signup.rejected, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.errorMessage = action.payload;
        })
        .addCase(login.pending, (state) => {
            state.loading = true;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token", JSON.stringify(action.payload.token));
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.errorMessage = action.payload;
        });
    },
});

export const { logout, clearErrors } = userReducer.actions;

export default userReducer.reducer;
