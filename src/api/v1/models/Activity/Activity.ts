import mongoose, { Schema } from "mongoose";
import { generateError } from "../../helpers/errors";
import { assignment, live, materials } from "../../helpers/models/activities";
import { IActivity } from "../../interfaces/IActivity";
import Section from "../Section";

const options = {
  discriminatorKey: "type",
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

activitiesSchema.pre<IActivity>("save", async function (next: any) {
  try {
    console.log(this.category);
    const section = await Section.findByIdAndUpdate(this.sectionId, {
      $push: { activities: this._id },
    });
    next();
  } catch (err) {
    generateError("There was a problem saving this activity", 404, next);
  }
});

activitiesSchema.pre<IActivity>("remove", async function (next: any) {
  try {
    const section = await Section.findByIdAndUpdate(this.sectionId, {
      $pull: { activities: this._id },
    });
    next();
  } catch (err) {
    generateError("There was a problem saving this activity", 404, next);
  }
});

export default mongoose.model<IActivity>("activities", activitiesSchema);
