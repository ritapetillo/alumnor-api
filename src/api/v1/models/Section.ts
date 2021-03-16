import mongoose from "mongoose";
import { generateError } from "../helpers/errors";
import { ISection } from "../interfaces/ISection";
import Course from "./Course";

const sectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    courseId: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    activities: [{ type: mongoose.Schema.Types.ObjectId, ref: "activities" }],
  },
  { timestamps: true }
);

sectionSchema.pre<ISection>("save", async function (next) {
  try {
    if (!this.courseId) return next();
    const course = await Course.findByIdAndUpdate(this.courseId, {
      $push: { sections: this._id },
    });
    next();
  } catch (err) {
    const error: any = new Error(
      "There was an error adding this section to the course"
    );
    error.code = 401;
    next(error);
  }
});

sectionSchema.pre<ISection>("remove", async function (next) {
  try {
    if (!this.courseId) return next();
    const course = await Course.findByIdAndUpdate(this.courseId, {
      $pull: { sections: this._id },
    });

    next();
  } catch (err) {
    const error: any = new Error(
      "There was an error adding this section to the course"
    );
    error.code = 401;
    next(error);
  }
});

export default mongoose.model<ISection>("sections", sectionSchema);
