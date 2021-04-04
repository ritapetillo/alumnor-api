import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  },
  { timestamps: true }
);

const feedSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    media: [String],
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "courses" },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    comments: [commentSchema],
  },
  { timestamps: true }
);

export default mongoose.model("feeds", feedSchema);
