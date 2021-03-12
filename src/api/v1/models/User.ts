import mongoose, { Schema } from "mongoose";
import IUser from "../interfaces/IUser";
import bcrypt from "bcrypt";
import userRoutes from "../services/users";

const options = { discriminatorKey: "role" };

const userSchema = new Schema<IUser>(
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
    
    verified: {
      type: Boolean,
      default: false,
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

userSchema.methods.comparePassword = async function (candidatePassword, next) {
  try {
    const isValid = await bcrypt.compare(
      candidatePassword,
      this.password.toString()
    );
    return isValid;
  } catch (err) {
    return null;
  }
};
// Omit the password when returning a user
userSchema.set("toJSON", {
  transform: function (doc: any, ret: any) {
    delete ret.password;
    return ret;
  },
});

export default mongoose.model<IUser>("users", userSchema);
