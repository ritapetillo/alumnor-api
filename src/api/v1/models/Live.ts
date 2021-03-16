import mongoose, { Schema } from "mongoose";

import { ILive } from "../interfaces/ILive";
import Activity from "./Activity";
const options = { discriminatorKey: "category" };

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
  { discriminatorKey: "category" }
);
export default Activity.discriminator<ILive>("live", liveSchema);
