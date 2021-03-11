import mongoose, { Schema } from "mongoose";
import IInstructor from "../interfaces/IInstructor";
import User from "./User";

const options = { discriminatorKey: "role" };

const instructorSchema: Schema = new Schema(
  {
    canCreateCourse: {
      type: Boolean,
      default: false,
    },
    typeOfPay: {
      type: String,
      default: "hourly",
      enum: ["hourly", "percentage"],
    },
    hourlyPay: Number,
    percentagePay: Number,
    approved: {
      type: Boolean,
      default: false,
    },
  },
  options
);

export default User.discriminator<IInstructor>("instructors", instructorSchema);
