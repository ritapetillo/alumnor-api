import mongoose, { Schema } from "mongoose";
import { IVideo } from "../../interfaces/IVideo";
import Activity from "./Activity";
const options = { discriminatorKey: "type" };

const videoSchema: Schema = new Schema(
  {
    videoLink: {
      type: String,
      required: true,
    },
  },
  options
);
export default Activity.discriminator<IVideo>('video', videoSchema);
