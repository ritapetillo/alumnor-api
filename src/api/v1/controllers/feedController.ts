import express, { Request, Response, NextFunction } from "express";
import { generateError } from "../helpers/errors";
import Feed from "../models/Feed";
import Submission from "../models/Submission";

const viewAllFeedsByCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const feeds = await Feed.find({
      courseId: req.params.courseId,
    })
      .populate({
        path: "authorId comments",
        populate: {
          path: "authorId",
        },
      })
      .sort({ createdAt: -1 });
    res.status(200).send({ feeds });
  } catch (err) {
    const message = "There was a problem retrieving feeds for this course";
    generateError(message, 404, next);
  }
};

const viewAllFeedsByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const feeds = await Submission.find({
      userId: req.params.userId,
    });
    res.status(200).send({ feeds });
  } catch (err) {
    const message = "There was a problem retrieving submissions";
    generateError(message, 404, next);
  }
};

const viewAllMyFeeds = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const feeds = await Submission.find({
      userId: req.user!._id,
    });
    res.status(200).send({ feeds });
  } catch (err) {
    const message = "There was a problem retrieving submissions";
    generateError(message, 404, next);
  }
};

const createFeed = async (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user!;
  const { courseId } = req.params;
  try {
    const newFeed = new Feed({
      authorId: _id,
      courseId,
      ...req.body,
    });
    const feed = await newFeed.save();
    res.status(200).send({ feed });
  } catch (err) {
    const message = "There was a problem creating a feed";
    generateError(message, 404, next);
  }
};

const uploadFileFeed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.file) {
      const { file }: any = req;
      res.status(200).send(file.path);
    } else throw Error;
  } catch (err) {
    const message = "There was a problem creating a submission";
    generateError(message, 404, next);
  }
};

const editFeed = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { courseId } = req.params;
    console.log(req.body);
    const feed = await Feed.findByIdAndUpdate(
      courseId,
      {
        $set: req.body,
      },
      { new: true, runValidators: true }
    );
    if (!feed) generateError("Category not found", 404, next);
    res.status(200).send({ feed });
  } catch (err) {
    console.log(err);
    const message = "There was a problem editing this submission";
    generateError(message, 404, next);
  }
};

const deleteFeed = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { courseId } = req.params;
    const feed = await Feed.findById(courseId);
    if (!feed) {
      generateError("Category not found", 404, next);
    } else await feed.remove();
    res.status(200).send({ feed });
  } catch (err) {
    const message = "There was a problem deleting this submission";
    generateError(message, 404, next);
  }
};

export default {
  createFeed,
  editFeed,
  deleteFeed,
  viewAllFeedsByCourse,
  viewAllFeedsByUser,
  viewAllMyFeeds,
  uploadFileFeed,
};
