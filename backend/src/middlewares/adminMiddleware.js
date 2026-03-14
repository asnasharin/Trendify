const userModel = require("../models/userModel");

const adminMiddleware = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);

    if (!user || user.role !== 1) {
      return res.status(403).json({
        success: false,
        message: "Admin access required",
      });
    }

    next();
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Error checking admin role",
    });
  }
};

module.exports = adminMiddleware;