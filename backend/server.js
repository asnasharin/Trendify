const express = require("express");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");

const { connectDb } = require("./src/config/mongoConnect");

dotenv.config();

const app = express();

// DB connection
connectDb();

// Cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Middleware
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});