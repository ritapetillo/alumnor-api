import mongoose, { Schema } from "mongoose";
import IStudent from "../interfaces/IStudent";
import User from "./User";

const options = { discriminatorKey: "role" };

const studentSchema: Schema = new Schema(
  {
    cart: {
      items: [
        {
          type: mongoose.Types.ObjectId,
          ref: "courses",
        },
      ],
      discount: String,
    },
  },
  options
);

export default User.discriminator<IStudent>("student", studentSchema);
