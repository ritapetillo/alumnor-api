import mongoose, { Schema } from "mongoose";
import { ILive } from "../../interfaces/ILive";
import Activity from "./Activity";
const options = { discriminatorKey: "type" };

const liveSchema: Schema = new Schema(
  {
    liveLink: {
      type: String,
    },
    recordingLink: {
      type: String,
    },
    attendence: [],
  },
  options
);
export default Activity.discriminator<ILive>("live", liveSchema);
