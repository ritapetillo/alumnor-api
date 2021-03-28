import mongoose, { Schema } from "mongoose";
import { IActivity } from "../../interfaces/IActivity";
import Activity from "./Activity";
const options = { discriminatorKey: "type" };

const assignmentSchema: Schema = new Schema(
  {
    submissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "submissions",
      },
    ],
  },
  options
);

export default Activity.discriminator<IActivity>(
  "assignment",
  assignmentSchema
);
