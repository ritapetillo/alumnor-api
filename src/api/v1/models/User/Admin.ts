import mongoose, { Schema } from "mongoose";
import { CREATE, DELETE, EDIT, READ } from "../../helpers/models/priviledges";
import IAdmin from "../../interfaces/IAdmin";
import User from "./User";
const options = { discriminatorKey: "role" };

const adminSchema: Schema = new Schema(
  {
    confirmed: { type: Boolean, default: false },
    privileges: {
      course: {
        type: Array,
        default: [CREATE, DELETE, READ, EDIT],
      },
      student: {
        type: Array,
        default: [CREATE, DELETE, READ, EDIT],
      },
      instructor: {
        type: Array,
        default: [CREATE, DELETE, READ, EDIT],
      },
      admin: {
        type: Array,
        default: [CREATE, DELETE, READ, EDIT],
      },
      category: {
        type: Array,
        default: [CREATE, DELETE, READ, EDIT],
      },
    },
  },
  options
);

export default User.discriminator<IAdmin>("admin", adminSchema);
