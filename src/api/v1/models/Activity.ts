
import mongoose, { Schema } from "mongoose";
import { IActivity } from "../interfaces/IActivity";

const options = {
  discriminatorKey: "category",
  timestamps: true,
};

const activitiesSchema = new Schema<IActivity>(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
    },
    links: [String],
    uploads: [String],
    deadline: {
      type: Date,
    },
    completed: {
      type: Boolean,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    courseId: {
      type: String,
    },
    sectionId: {
      type: String,
    },
  },
  options
);



export default mongoose.model<IActivity>("activitiy", activitiesSchema);
