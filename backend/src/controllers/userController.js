const asyncHandler = require('express-async-handler');
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken');

// jwt creating token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "30d" });
};

// register controller
exports.RegisterController = asyncHandler(
    async (req, res, next) => {
        const { email, password, name } = req.body;
        const existUser = await userModel.findOne({ email });
        if (existUser) {
            res.status(409);
            return next(new Error("Email already exists"));
        }
        
        const newUser = await userModel.create({
            name,
            password,
            email
        });

        const token = createToken(newUser._id);
        res.status(200).json({
            success: true,
            message: "User created successfully",
            token,
            user: {
                _id: newUser._id,
                email: newUser.email,
                name: newUser.name
            },
        });
    }
);


// login controller
exports.loginController = asyncHandler(
    async(req, res, next) => {
        const {email, password} = req.body;
        const user = await userModel.findOne({ email: email });
        if (user) {
            if (user.password && (await user.matchPassword(password))){
                const token = createToken(user._id);
                res.status(200).json({
                    success: true,
                    token: token,
                    user: {
                        _id: user._id,
                        email: user.email,
                        name: user.name,
                        role: user.role,
                    },
                });
            } else {
                res.status(401);
                return next(Error("Invalid credentials"));
            }
        } else {
            res.status(401);
            return next(Error("user not Found"));
        }
    }
);