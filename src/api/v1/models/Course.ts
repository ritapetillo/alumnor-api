import mongoose from "mongoose";
import { generateError } from "../helpers/errors";
import { ICourse, ICourseModel } from "../interfaces/ICourse";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    scheduleDescription: {
      type: String,
    },
    highlights: {
      type: [String],
    },
    picture: {
      trype: String,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
      },
    ],
    price: {
      type: String,
      require: true,
    },
    salePrice: {
      type: String,
      require: true,
    },
    coupon: {
      code: String,
      value: Number,
    },
    instructors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    liveSchedule: {
      type: [Date],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    sections: [{ type: mongoose.Schema.Types.ObjectId, ref: "sections" }],
  },
  { timestamps: true }
);

courseSchema.pre<ICourse>("save", async function (next: any) {
  try {
    if (!this.picture) this.picture = "https://placeimg.com/640/480/tech";
  } catch {
    generateError("There is a problem saving the course", 404, next);
  }
});

courseSchema.statics.findCoursePublic = async function (id, next) {
  try {
    const course = this.findById(id).populate('instructors').select("-sections");
    return course;
  } catch (err) {
    generateError("There is a problem finding this course", 404, next);
  }
};
export default mongoose.model<ICourse, ICourseModel>("courses", courseSchema);
