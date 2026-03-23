const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");

const userRouter = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const orderRoute = require("./routes/orderRoute");
const paymentRoute = require("./routes/paymentRoute");
const reviewRoute = require("./src/routes/reviewRoute");

const { errorHandler, notFound } = require("./middlewares/errorMiddleware");

const app = express();

// middlewares

const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? [
          "",
          "",
        ]
      : "http://localhost:5000", 
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
app.use("/api/v1", reviewRoute);

// error handler
app.use("*", notFound);
app.use(errorHandler);

module.exports = app;