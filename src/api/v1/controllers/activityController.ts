import { Request, Response, NextFunction } from "express";
import { generateError } from "../helpers/errors";
import Activity from "../models/Activity/Activity";
import { IActivity } from "../interfaces/IActivity";
import Live from "../models/Activity/Live";
import Materials from "../models/Activity/Materials";
import Assignment from "../models/Activity/Assignment";
import { createNewActivity } from "../helpers/models/activities";

const viewActivity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const activity = await Activity.findById(req.params.id);
    res.status(201).send({ activity });
  } catch (err) {
    generateError("There was an error retrieving this activity", 404, next);
  }
};

const createActivity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.user!._id;
    const { type } = req.body;
    const { courseId } = req.params;
    const data = {
      ...req.body,
      courseId,
      createdBy: _id,
    };
    const newActivity = createNewActivity(type, data);
    const savedActivity = await newActivity.save();
    res.status(201).send({ activity: savedActivity });
  } catch (err) {
    console.log(err);

    generateError(
      "There was an error createing a new activity for this course",
      404,
      next
    );
  }
};

const editActivity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const activityToEdit = await Activity.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).send({ activity: activityToEdit });
  } catch (err) {
    generateError("There was an error editing this activity", 404, next);
  }
};
const deleteActivity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    console.log(id);
    const activityToDelete = await Activity.findById(id);
    console.log(activityToDelete);
    if (!activityToDelete) {
      generateError("This section does not exist", 404, next);
    } else {
      await activityToDelete.remove();
      res.status(200).send({ activityToDelete: activityToDelete._id });
    }
  } catch (err) {
    generateError("There was an error deleting this activity", 404, next);
  }
};

export default {
  editActivity,
  createActivity,
  deleteActivity,
  viewActivity,
};
