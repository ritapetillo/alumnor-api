import { NextFunction } from "express-serve-static-core";
import mongoose from "mongoose";
import { generateError } from "../helpers/errors";
import ICategory from "../interfaces/ICateogry";
import Course from "./Course";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

categorySchema.pre<ICategory>("remove", async function (next: any) {
  try {
    const updateCourses = await Course.updateMany(
      { category: this._id },
      { $set: { category: "" } }
    );
    next();
  } catch (err) {
    generateError("There was a problem removing this category", 404, next);
  }
});

export default mongoose.model<ICategory>("categories", categorySchema);
