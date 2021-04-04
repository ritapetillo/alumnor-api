import express, { Request, Response, NextFunction } from "express";
import { generateError } from "../helpers/errors";
import Feed from "../models/Feed";
import Submission from "../models/Submission";

const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { _id } = req.user!;

  try {
    const newComment = {
      authorId: _id,
      ...req.body,
    };
    const feed = await Feed.findByIdAndUpdate(
      req.params.feedId,
      {
        $push: { comments: newComment },
      },
      { new: true, runValidators: true }
    );
    res.status(200).send({ feed });
  } catch (err) {
    const message = "There was a problem creating a feed";
    generateError(message, 404, next);
  }
};

const editComment = async (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user!;
  const { feedId, commentId } = req.params;

  try {
    const feed = await Feed.findOneAndUpdate(
      { _id: feedId, "comment._id": commentId },
      {
        $set: { "comment.$": req.body },
      },
      { new: true, runValidators: true }
    );
    res.status(200).send({ feed });
  } catch (err) {
    const message = "There was a problem creating a feed";
    generateError(message, 404, next);
  }
};

const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { _id } = req.user!;
  const { feedId, commentId } = req.params;
  try {
    const feed = await Feed.findOneAndUpdate(
      { _id: feedId },
      // @ts-ignore
      { $pull: { comments: { _id: commentId } } },
      { new: true, runValidators: true }
    );
    res.status(200).send({ feed });
  } catch (err) {
    console.log(err);
    const message = "There was a problem creating a feed";
    generateError(message, 404, next);
  }
};
export default { createComment, editComment, deleteComment };
