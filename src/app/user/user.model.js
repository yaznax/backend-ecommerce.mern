const mongoose = require("mongoose");

const UserSchemaDef = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    image: String,
    address: {
      shipping: {
        type: String,
      },
      billing: {
        type: String,
      },
    },
    role: {
      type: String,
      enum: ["admin", "seller", "customer"],
      default: "customer",
    },
    phone: String,
    token: String,
    resetToken: String,
    resetExpiry: Date,
  },
  {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);

const UserModel = mongoose.model("User", UserSchemaDef);
module.exports = UserModel;
