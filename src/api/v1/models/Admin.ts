import mongoose, { Schema } from "mongoose";
import IAdmin from "../interfaces/IAdmin";
import User from "./User";

const options = { discriminatorKey: "role" };

const adminSchema: Schema = new Schema(
  {
    confirmed: { type: Boolean, default: false },
  },
  options
);

export default User.discriminator<IAdmin>("admin", adminSchema);
