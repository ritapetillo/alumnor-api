import mongoose from "mongoose";
import { ICourse } from "../interfaces/ICourse";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  highlights: {
    type: [String],
  },
  picture: {
    trype:String
  },
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
    },
  ],
  price: {
    type: String,
    require: true,
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
  sections: [{ type: mongoose.Schema.Types.ObjectId, ref: "sections" }],
});

export default mongoose.model<ICourse>("courses", courseSchema);
