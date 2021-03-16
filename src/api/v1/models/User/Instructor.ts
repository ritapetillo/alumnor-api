import mongoose, { Schema } from "mongoose";
import IInstructor from "../../interfaces/IInstructor";
import User from "./User";
import { CREATE, DELETE, EDIT, READ } from "../../helpers/models/priviledges";

const options = { discriminatorKey: "role" };

const instructorSchema: Schema = new Schema(
  {
    rating: {
      type: Number,
    },
    qualifications: [{ type: String }],
    hourlyPay: Number,
    percentagePay: Number,
    approved: {
      type: Boolean,
      default: false,
    },
    privileges: {
      course: {
        type: Array,
        default: [CREATE, DELETE, READ, EDIT],
      },
      student: {
        type: Array,
        default: [READ],
      },
    },
  },
  options
);

export default User.discriminator<IInstructor>("instructor", instructorSchema);
