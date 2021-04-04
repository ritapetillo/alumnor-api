import mongoose, { Mongoose, Schema } from "mongoose";
import { generateError } from "../helpers/errors";
import { IEnrollment } from "../interfaces/IEnrollment";
import User from "./User/User";

const enrollmentSchema: Schema = new Schema(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "courses" },

    userId: {
      type: String,
    },
    payed: {
      type: Boolean,
      default: false,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    dateCompletition: {
      type: Date,
    },
    paymentDetails: {
      type: {},
    },
    Notes: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

enrollmentSchema.pre<IEnrollment>("save", async function (next: any) {
  try {
    const user = await User.findByIdAndUpdate(this.userId, {
      $addToSet: { enrollments: this._id },
    });
    next();
  } catch (err) {
    generateError("There is a problem saving this enrollment", 404, next);
  }
});

enrollmentSchema.virtual("courses", {
  ref: "courses",
  localField: "courseId",
  foreignField: "_id",
  justOne: true,
});

export default mongoose.model<IEnrollment>("enrollments", enrollmentSchema);
