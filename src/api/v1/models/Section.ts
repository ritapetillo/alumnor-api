import mongoose from "mongoose";
import { ISection } from "../interfaces/ISection";

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
    activities: [{}],
  },
  { timestamps: true }
);

export default mongoose.model<ISection>("categories", sectionSchema);
