const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name."],
    },
    email: {
      type: String,
      required: [true, "Please provide an email."],
      unique: true,
    },
    mobile: {
      type: String,
      // required: [true, "Please provide a mobile number."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password."],
    },
    profilePicture: {
      type: String,
      default: "",
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    savedContacts: [
      {
        name: String,
        mobile: String,
      }
    ],
    savedFriends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ]
    
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next){
  this.savedContacts = [...new Set(this.savedContacts)];
  next();
})

userSchema.methods.generateToken = function () {
  const payload = { id: this._id, email: this.email };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
