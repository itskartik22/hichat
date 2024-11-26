const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    const { name, email, number, password, profile_pic } = req.body;
    const existingUser = await User.findOne({
      $or: [{ email }, { number }],
    });
    if (existingUser) {
      console.log("User already exists.");
      return res.status(400).json({
        status: "fail",
        message: "User already exists.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      email,
      mobile: number,
      password: hashedPassword,
      profilePicture: profile_pic,
    });
    const token = user.generateToken();
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.status(201).json({
      status: "success",
      token,
      data: {
        email: user.email,
        name: user.name,
        mobile: user.mobile,
        _id: user._id,
      },
      message: "User created successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.checkEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).select(
      "-__v -password -createdAt -updatedAt"
    );
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found.",
      });
    }
    res.status(200).json({
      status: "success",
      data: user,
      message: "User found.",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// exports.verifyPassword = async (req, res) => {
//   try {
//     const { userId, password } = req.body;
//     const user = await User.findOne({ _id: userId });
//     if (!user) {
//       return res.status(404).json({
//         status: "fail",
//         message: "User not found.",
//       });
//     }
//     const isCorrect = await bcrypt.compare(password, user.password);
//     if (!isCorrect) {
//       return res.status(400).json({
//         status: "fail",
//         message: "Invalid credentials.",
//       });
//     }
//     user.password = undefined;
//     const token = user.generateToken();
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//     });
//     res.status(200).json({
//       status: "success",
//       token,
//       data: {
//         user,
//       },
//       message: "User logged in successfully.",
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       message: error.message,
//     });
//   }
// };

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select(
      "-__v -createdAt -updatedAt"
    );
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found.",
      });
    }
    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid credentials.",
      });
    }
    user.password = undefined;
    const token = user.generateToken();
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({
      status: "success",
      token,
      data: user,
      message: "User logged in successfully.",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.userDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "-password -__v -createdAt -updatedAt"
    );
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found.",
      });
    }
    res.status(200).json({
      status: "success",
      data: user,
      message: "User Information Fetched.",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }
    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "You are not logged in.",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select(
      "-password -__v -createdAt -updatedAt, -savedContacts -savedFriends"
    );
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found.",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      status: "fail",
      message: "Invalid token.",
    });
  }
};

exports.logoutUser = (req, res) => {
  console.log("Logout user");
  res.clearCookie("token");
  res.status(200).json({
    status: "success",
    message: "User logged out successfully.",
  });
};

exports.updateUserDetails = async (req, res) => {
  try {
    const { name, mobile, profile_pic } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, {
      name,
      profilePicture: profile_pic,
      mobile,
    });
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found.",
      });
    }
    res.status(200).json({
      status: "success",
      data: user,
      message: "User details updated successfully.",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.deleteUsers = async (req, res) => {
  try {
    await User.deleteMany();
    res.status(200).json({
      status: "success",
      message: "All users deleted successfully.",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

