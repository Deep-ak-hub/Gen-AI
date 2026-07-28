import mongoose from "mongoose";
import { Status } from "../config/constants.js";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      min: 2,
      max: 50,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: String,

    activationToken: {
      type: String,
      index: true,
    },
    forgetPasswordToken: String,
    expiryTime: Date,

    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.INACTIVE,
    },
  },
  {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
  },
);

export const UserModel = mongoose.model("User", UserSchema);
