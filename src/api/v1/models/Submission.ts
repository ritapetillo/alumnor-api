import mongoose, { Schema } from "mongoose";
import { generateError } from "../helpers/errors";
import { ISubmission } from "../interfaces/ISubmission";
import Assignment from "./Activity/Assignment";

const submissionSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
  },
  assignmentId: {
    type: mongoose.Types.ObjectId,
  },
  courseId: {
    type: mongoose.Types.ObjectId,
  },
  title: {
    type: String,
  },
  text: {
    type: String,
  },
  uploads: [String],
  links: [String],
});

submissionSchema.pre<ISubmission>("save", async function (next: any) {
  try {
    const assignment = await Assignment.findByIdAndUpdate(this.assignmentId, {
      $push: { submissions: this._id },
    });
    next();
  } catch (err) {
    generateError("There was an error submitting your homework", 404, next);
  }
});
submissionSchema.pre<ISubmission>("remove", async function (next: any) {
  try {
    const assignment = await Assignment.findByIdAndUpdate(this.assignmentId, {
      $pull: { submissions: this._id }
    });
    next();
  } catch (err) {
    generateError("There was an error deleteing your homework", 404, next);
  }
});

export default mongoose.model<ISubmission>("sumbissions", submissionSchema);
