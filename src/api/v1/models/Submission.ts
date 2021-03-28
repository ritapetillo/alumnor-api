import mongoose, { Schema } from "mongoose";
import { generateError } from "../helpers/errors";
import { ISubmission } from "../interfaces/ISubmission";
import Activity from "./Activity/Activity";
import Assignment from "./Activity/Assignment";

const submissionSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    assignmentId: {
      type: mongoose.Types.ObjectId,
      ref: "activities",
    },
    courseId: {
      type: mongoose.Types.ObjectId,
      ref: "courses",
    },
    grade: String,
    uploads: [{}],
    links: [String],
  },
  { timestamps: true }
);

submissionSchema.pre<ISubmission>("save", async function (next: any) {
  try {
    const assignment = await Activity.findByIdAndUpdate(this.assignmentId, {
      $push: { submissions: this._id },
    });
    next();
  } catch (err) {
    generateError("There was an error submitting your homework", 404, next);
  }
});
submissionSchema.pre<ISubmission>("remove", async function (next: any) {
  try {
    const assignment = await Activity.findByIdAndUpdate(this.assignmentId, {
      $pull: { submissions: this._id },
    });
    next();
  } catch (err) {
    generateError("There was an error deleteing your homework", 404, next);
  }
});

export default mongoose.model<ISubmission>("submissions", submissionSchema);
