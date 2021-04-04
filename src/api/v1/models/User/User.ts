import mongoose, { Query, Schema } from "mongoose";
import IUser, { IUserModel } from "../../interfaces/IUser";
import bcrypt from "bcrypt";
import { createNewGoogleUser } from "../../helpers/oauth/strategies/google/utils";
import { createNewFbUser } from "../../helpers/oauth/strategies/facebook/utils";

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
    zoom: {
      zoomId: String,
      zoomEmail: String,
      zoomMeetingRoom: String,
      zoomRefreshToken: String,
      zoomAccessToken: String,
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
    enrollments: [{ type: mongoose.Schema.Types.ObjectId, ref: "enrollments" }],
  },
  options
);

userSchema.pre<IUser>("save", async function (next) {
  try {
    if (!this.picture)
      this.picture = `https://ui-avatars.com/api/?name=${this.firstName}+${this.lastName}&?background=random`;

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

// userSchema.post<Query<IUser, IUser>>("findOneAndUpdate", async function () {
//   try {
//     const pwPassedIn = this!.getUpdate()!.$set!.password!;
//     if (pwPassedIn) {
//       const salt = await bcrypt.genSalt();
//       const pass = await bcrypt.hash(pwPassedIn, salt);
//       this.set("password", pass);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

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

//STATIC METHODS

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
      if (strategy == "facebookId") {
        const user = await createNewFbUser(profile);
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

//method to edit user
userSchema.statics.editUser = async function (id, edits) {
  try {
    if (edits.password) {
      const salt = await bcrypt.genSalt();
      edits.password = await bcrypt.hash(edits.password, salt);
    }
    const user = await this.findByIdAndUpdate(
      id,
      { $set: edits },
      { new: true, runValidators: true }
    );
    return user;
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
