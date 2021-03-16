import mongoose, { Schema } from "mongoose";
import { ILive } from "../../interfaces/ILive";
import Activity from "./Activity";
const options = { discriminatorKey: "type" };

const liveSchema: Schema = new Schema(
  {
    liveLink: {
      type: String,
      required: true,
    },
    recordingLink: {
      type: String,
    },
  },
  options
);
export default Activity.discriminator<ILive>("live", liveSchema);
