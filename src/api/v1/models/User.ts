import mongoose, { Schema } from "mongoose";
import IUser from "../interfaces/IUser";
import bcrypt from "bcrypt";

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
    headline: {
      type: String,
    },
    about: {
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

userSchema.pre<IUser>("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    const error: any = new Error("There was an error saving the credentials");
    error.code = 401;
    next(error);
  }
});

export default mongoose.model<IUser>("users", userSchema);
