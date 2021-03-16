import mongoose, { Mongoose, Schema } from "mongoose";
import { IEnrollment } from "../interfaces/IEnrollment";

const enrollmentSchema: Schema = new Schema(
  {
    courseId: {
      type: String,
    },
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

enrollmentSchema.virtual("courses", {
  ref: "courses",
  localField: "courseId",
  foreignField: "_id",
  justOne: true,
});

export default mongoose.model<IEnrollment>("enrollments", enrollmentSchema);
