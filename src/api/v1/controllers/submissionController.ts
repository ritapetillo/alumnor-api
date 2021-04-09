import express, { Request, Response, NextFunction } from "express";
import { generateError } from "../helpers/errors";
import Submission from "../models/Submission";

const viewAllSubmissionsByCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const submissions = await Submission.find({
      courseId: req.params.id,
    })
      .populate("assignmentId userId")
      .sort({ createdAt: -1 });
    res.status(200).send({ submissions });
  } catch (err) {
    const message = "There was a problem retrieving submissions";
    generateError(message, 404, next);
  }
};

const viewAllSubmissionsByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const submissions = await Submission.find({
      userId: req.params.userId,
    });
    res.status(200).send({ submissions });
  } catch (err) {
    const message = "There was a problem retrieving submissions";
    generateError(message, 404, next);
  }
};

const viewAllMySubmissions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const submissions = await Submission.find({
      userId: req.user!._id,
    });
    res.status(200).send({ submissions });
  } catch (err) {
    const message = "There was a problem retrieving submissions";
    generateError(message, 404, next);
  }
};

const createSubmission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { _id } = req.user!;
  const { courseId, assignmentId } = req.params;
  try {
    const newSubmission = new Submission({
      userId: _id,
      courseId,
      assignmentId,
      links: req.body.links,
    });
    const savedSubmission = await newSubmission.save();
    res.status(200).send({ submission: savedSubmission });
  } catch (err) {
    const message = "There was a problem creating a submission";
    generateError(message, 404, next);
  }
};

const uploadFileSubmission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { submissionId } = req.params;
    if (req.files) {
      const { files }: any = req;
      files.forEach(async (file: any) => {
        const fileObj: any = {
          path: file.path,
          size: file.size,
          type: file.mimetype,
          name: file.originalname,
        };
        const editSubmission = await Submission.findByIdAndUpdate(
          submissionId,
          {
            $addToSet: { uploads: fileObj },
          }
        );
      });
      res.status(200).send("uplaoded");
    } else throw Error;
  } catch (err) {
    const message = "There was a problem creating a submission";
    generateError(message, 404, next);
  }
};

const editSubmission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const submissionToEdit = await Submission.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true, runValidators: true }
    );
    if (!submissionToEdit) generateError("Category not found", 404, next);
    res.status(200).send({ submission: submissionToEdit });
  } catch (err) {
    console.log(err);
    const message = "There was a problem editing this submission";
    generateError(message, 404, next);
  }
};

const deleteSubmission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const submissionDeleted = await Submission.findById(id);
    if (!submissionDeleted) generateError("Category not found", 404, next);
    await submissionDeleted?.remove();
    res.status(200).send({ submission: submissionDeleted });
  } catch (err) {
    const message = "There was a problem deleting this submission";
    generateError(message, 404, next);
  }
};

export default {
  createSubmission,
  editSubmission,
  deleteSubmission,
  viewAllSubmissionsByCourse,
  viewAllSubmissionsByUser,
  viewAllMySubmissions,
  uploadFileSubmission,
};
