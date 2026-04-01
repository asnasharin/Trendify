import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../Api/api"

// get all products
export const getProducts = createAsyncThunk(
  "get/products",
  async ({ price, category, rating }, thunkApi) => {
    try {
      // Build the query string
      let query = '?';
      if (price) query += `price=${price.join(',')}&`;
      if (category) query += `category=${category}&`;
      if (rating) query += `ratings=${rating}&`;

      // // Make the API call with the query string
      const { data } = await api.get(`/get-product${query}`);
      console.log(data);
        // const { data } = await api.get("/get-product");
      // console.log(data);
      return data.data;
    } catch (error) {
      if (error.response) {
        const payload = {
          message: error.response.data.message || "An error occurred",
          status: error.response.status,
        };
        return thunkApi.rejectWithValue(payload);
      } else {
        const payload = {
          message: error.message,
          status: 400,
        };
        return thunkApi.rejectWithValue(payload);
      }
    }
  }
);


// getAdmin products
export const getAdminProducts = createAsyncThunk(
  "get/AdminProducts",
  async(_, thunkApi) => {
    try {
      const  data  = await api.get('/admin/products');
      console.log("api", data)
      return data.data;
      
    } catch (error) {
      if(error.response) {
        const payload = {
          message: error.response.data.message || "an error occured",
          status: error.response.status,
        };
        return thunkApi.rejectWithValue(payload);
    } else {
      const payload = {
        message: error.message,
        status: 400,
      };
      return thunkApi.rejectWithValue(payload);
    }
  }
}
)


// deleteproduct admin
export const DeleteProduct = createAsyncThunk(
  'product/deleteproduct',
  async(id, thunkApi) => {
    try {
      const { data } = await api.delete(`/admin/delete-prod/${id}`);
      return data;
  
    } catch (error) {
      if(error.response) {
        let payload = {
          message: error.response.data.message || "An error occured",
          status: error.response.status
        }
        return thunkApi.rejectWithValue(payload)
      } else {
        let payload = {
          message: error.message,
          status: error.status || 500
        }
        return thunkApi.rejectWithValue(payload)
      }
    }
  }
)

// create product admin
export const createProduct = createAsyncThunk(
  "product/createproduct",
  async(productData, thunkApi) => {
    try {
      const response = await api.post("/admin/create-product", productData);
      return response.data;
    } catch (error) {
      if(error.response) {
        let payload = {
          message: error.response.data.message || "an error occured",
          status: error.response.status,
        }
        return thunkApi.rejectWithValue(payload);
      } else {
        let payload = {
          message: error.message,
          status: error.status || 500
        } 
        return thunkApi.rejectWithValue(payload);
      }
    }
  }
)

// update product

export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ id, productData }, thunkApi) => {
    try {
      const { data } = await api.put(`/update-prod/${id}`, {product: productData}, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Return the updated product data
      return data.product;
    } catch (error) {
      if (error.response) {
        return thunkApi.rejectWithValue({
          message: error.response.data.message || "An error occurred",
          status: error.response.status,
        });
      } else {
        return thunkApi.rejectWithValue({
          message: error.message,
          status: error.status || 500,
        });
      }
    }
  }
);

export const getProductDetails = createAsyncThunk(
  'product/getProductDetails',
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/product/${id}`);
      return response.data.product;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || 'Failed to fetch product details');
    }
  }
);

export const createReview = createAsyncThunk(
  'review/createReview',
  async (reviewData, thunkApi) => {
    try {
      const { data } = await api.post('/product/review/new', reviewData, {
        headers: {
          'Content-Type': 'application/json',
        },   
      });
      return data;
    } catch (error) {
      if (error.response) {
        return thunkApi.rejectWithValue({
          message: error.response.data.message || 'An error occured',
          status: error.response.status,
        });
      } else {
        return thunkApi.rejectWithValue({
          message: error.message,
          status: 500,
        })
      }
    }
  }
)

export const getAllReviews = createAsyncThunk(
  'review/getallreview',

  async (id, thunkApi) => {
    try {
      const { data } = await api.get(`/reviews/${id}`) 
      console.log('Reviews fetched:', data);
      return data; 
    } catch (error) {
      if (error.response) {
        return thunkApi.rejectWithValue({
          message: error.response.data.message || 'An error occured',
          status: error.response.status,
        });
      } else {
        return thunkApi.rejectWithValue({
          message: error.message,
          status: 500,
        })
      }
    }
  }
)

export const deleteReview = createAsyncThunk(
  "review/deletereview",

  async ({ reviewId, productId}, thunkApi) => {
    try {
      await api.delete(`/review/delete?product_id=${productId}&id=${reviewId}`);
      return { reviewId, productId}
    } catch (error) {
      if (error.response) {
        return thunkApi.rejectWithValue({
          message: error.response.data.message || 'An error occured',
          status: error.response.status,
        });
      } else {
        return thunkApi.rejectWithValue({
          message: error.message,
          status: 500,
        })
      }
    }
  }
)

export const clearErrors = () => async (dispatch) => {
  dispatch();
};