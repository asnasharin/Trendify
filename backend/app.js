const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");

// routes
const userRouter = require("./src/routes/userRoute");
const productRoute = require("./src/routes/productRoute");
const orderRoute = require("./src/routes/orderRoute");
const paymentRoute = require("./src/routes/paymentRoute");

// middlewares
const { errorHandler, notFound } = require("./src/middlewares/errorMiddleware");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://mern-ecommerce-2-n3wv.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {

      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);

// middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(fileUpload());

// routes
app.use("/api/v1", userRouter);
app.use("/api/v1", productRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", paymentRoute);

// error handlers
app.use(notFound);
app.use(errorHandler);

module.exports = app;