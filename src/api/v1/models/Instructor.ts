import mongoose, { Schema } from "mongoose";
import IInstructor from "../interfaces/IInstructor";
import User from "./User";

const options = { discriminatorKey: "role" };

const instructorSchema: Schema = new Schema(
  {
    rating: {
      type: Number,
    },
    qualifications: [{ type: String }],
    canCreateCourse: {
      type: Boolean,
      default: false,
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
