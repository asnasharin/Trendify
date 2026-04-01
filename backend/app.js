const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");

const userRouter = require("./src/routes/userRoute");
const productRoute = require("./src/routes/productRoute");
const orderRoute = require("./src/routes/orderRoute");
const paymentRoute = require("./src/routes/paymentRoute");


const { errorHandler, notFound } = require("./src/middlewares/errorMiddleware");

const app = express();

// middlewares
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? ["http://localhost:5173"] 
      : ["http://localhost:5173"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));
app.use(fileUpload());

// routes
app.use("/api/v1", userRouter);
app.use("/api/v1", productRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", paymentRoute);

// error handler
app.use(notFound);
app.use(errorHandler);

module.exports = app;