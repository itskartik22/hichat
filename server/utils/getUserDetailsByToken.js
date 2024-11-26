const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.getUserDetailsByToken = async (token) => {
  try {
    if (!token) {
      return null
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select(
      "-password -__v -createdAt -updatedAt"
    );
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};
