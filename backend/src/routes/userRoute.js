const express = require("express");
const { loginController, RegisterController } = require("../controllers/userController.js");

const route = express.Router();

route.post("/register", RegisterController);
route.post("/login", loginController)

module.exports = route;

