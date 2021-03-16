import mongoose, { Schema } from "mongoose";
import { IActivity } from "../../interfaces/IActivity";
import Activity from "./Activity";
const options = { discriminatorKey: "type" };

const materialSchema: Schema = new Schema({}, options);

export default Activity.discriminator<IActivity>('materials', materialSchema);
