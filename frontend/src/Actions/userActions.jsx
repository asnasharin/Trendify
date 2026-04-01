import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../Api/api";

// Register user

export const signup = createAsyncThunk(
    "auth/signup",
    async (signupData, thunkAPI) => {
        try {
            const { data } = await api.post(
                "/register",
                signupData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            return data; 
        } catch (error) {
            let payload;
            
            if (error.response) {

                payload = {
                    message: error.response.data.message || "An error occurred",
                    status: error.response.status,
                };
            } else if (error.request) {

                payload = {
                    message: "Network Error: No response received",
                    status: 0,
                };
            } else {

                payload = {
                    message: error.message || "An unknown error occurred",
                    status: 500,
                };
            }
            
            return thunkAPI.rejectWithValue(payload);
        }
    }
);


// login user

export const login = createAsyncThunk(
    "auth/login",
    async(loginData, thunkAPI) => {
        try {
            const { data } = await api.post(
                "/login",
                loginData,
                {
                    headers: {"Content-Type": "application/json"}
                }
            );

            // localStorage.setItem('token', data.token);
            return data;
        } catch (error) {
            if (error.response) {
                let payload
                payload = {
                    message: error.response.data.message || "An error occurred",
                    status: error.response.status,
                };
            } else if (error.request) {

                payload = {
                    message: "Network Error: No response received",
                    status: 0,
                };
            } else {

                payload = {
                    message: error.message || "An unknown error occurred",
                    status: 500,
                };
            }
            
            return thunkAPI.rejectWithValue(payload);
        }
    }
)