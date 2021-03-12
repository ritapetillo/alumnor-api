import mongoose, { Schema } from "mongoose";
import IUser, { IUserModel } from "../interfaces/IUser";
import bcrypt from "bcrypt";
import userRoutes from "../services/users";
import { createNewGoogleUser } from "../helpers/oauth/strategies/google/utils";
const options = { discriminatorKey: "role", timeStamp: true };

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
    picture: {
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

//method to findOneOrCreate
userSchema.statics.findOrCreate = async function (strategy = "", profile, id) {
  try {
    const user = await this.findOne({
      email: profile.email,
      [strategy]: id,
    });
    if (user) {
      return user;
    }
    //if there is no user with such email
    else {
      if (strategy == "googleId") {
        const user = await createNewGoogleUser(profile);
        if (user) {
          return user;
        } else return null;
      }
      const user = new this(profile);
      user.role = "student";
      const userSaved = await user.save();
      return userSaved;
    }
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

export default mongoose.model<IUser, IUserModel>("users", userSchema);
