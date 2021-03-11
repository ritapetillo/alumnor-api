import mongoose, { Schema } from "mongoose";
import IUser from "../interfaces/IUser";

const options = { discriminatorKey: "role" };

const userSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
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
    googleId: {
      type: String,
    },
    address: {
      type: Object,
    },
    image: {
      type: String,
    },
    dateBirth: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    verified: {
      type: Boolean,
    },
  },
  options
);

export default mongoose.model<IUser>("users", userSchema);
