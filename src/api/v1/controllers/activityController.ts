import { Request, Response, NextFunction } from "express";
import { generateError } from "../helpers/errors";
import Activity from "../models/Activity/Activity";
import { IActivity } from "../interfaces/IActivity";
import Live from "../models/Activity/Live";
import Materials from "../models/Activity/Materials";
import Assignment from "../models/Activity/Assignment";
import { createNewActivity } from "../helpers/models/activities";
import User from "../models/User/User";
import axios from "axios";
import Course from "../models/Course";
import Enrollment from "../models/Enrollment";
import { IEnrollment } from "../interfaces/IEnrollment";
import { ObjectId } from "mongoose";
var q2m = require("query-to-mongo");

const viewActivities = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    var query = q2m(req.query);

    const activities = await Activity.find(query.criteria).populate({
      path: "submissions",
      populate: {
        path: "userId",
      },
    });
    res.status(201).send({ activities });
  } catch (err) {
    generateError("There was an error retrieving this activity", 404, next);
  }
};

const viewActivity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const activity = await Activity.findById(req.params.id).populate({
      path: "submissions",
      populate: {
        path: "userId",
      },
    });
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
    const { courseId, sectionId } = req.params;
    const data = {
      ...req.body,
      courseId,
      sectionId,
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

const editLiveActivity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
 
    let activityToEdit = await Activity.findById(id);
    if (!activityToEdit) throw Error;
    const liveMeeting = Object.assign(
      activityToEdit.liveMeeting,
      req.body.liveMeeting
    );
  
    const activity = await Activity.findByIdAndUpdate(
      id,
      {
        $set: {
          text: req.body.text,
          liveMeeting: { ...liveMeeting },
        },
      },
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
    const activityToDelete = await Activity.findById(id);
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
const uploadFiles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!req.user) throw Error;

    if (req.files) {
      const { files }: any = req;
      files.forEach(async (file: any) => {
        const fileObj: any = {
          path: file.path,
          size: file.size,
          type: file.mimetype,
          name: file.originalname,
        };
        const editedAct = await Activity.findByIdAndUpdate(id, {
          $addToSet: { uploads: fileObj },
        });
      });
      res.status(200).send("images uploaded");
    } else throw Error;
  } catch (err) {
  
    const error: any = new Error("It was not possible to upload the picture");
    error.code = 401;
    next(error);
  }
};

const deleteFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const activityToEdit = await Activity.findByIdAndUpdate(
      id,
      { $pull: { uploads: { path: req.body.path } } },
      { new: true }
    );
    res.status(200).send({ activity: activityToEdit });
  } catch (err) {
    generateError("There was an error editing this activity", 404, next);
  }
};

const generateLiveLink = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.user!._id;
    const user = await User.findById(_id);
    if (!user) throw Error;

    if (user.zoom) {
      const request = await axios.post(
        `https://api.zoom.us/v2/users/${user.zoom.zoomEmail}/meetings`,
        req.body,
        {
          headers: {
            authorization: "Bearer " + user?.zoom.zoomAccessToken,
          },
        }
      );
      const link = await request.data;
      res.send({ link });
    }
  } catch (err) {
    const error: any = new Error(
      "It was not possible to generate a new live link"
    );

    error.code = 401;

    next(error);
  }
};

const viewAllMyActivities = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw Error;

    const userId = req.user._id;
    const enrollments = await Enrollment.find({
      userId,
    }).populate({ path: "courses" });
    let courses: (
      | string
      | ObjectId
    )[] = enrollments.map((enrollment: IEnrollment) =>
      enrollment.courseId.toString()
    );
    courses = [...new Set(courses)];
    const activites = await Activity.find().select("-submissions -attendence");
    const activitiesPerCourse: any = courses.map((course: any) => {
      const act = activites.filter((activity: IActivity) =>
        req.query.type
          ? activity.courseId == course && activity.type === req.query.type
          : activity.courseId == course
      );
      return act;
    });
    res.status(200).send({ activities: activitiesPerCourse.flat() });
  } catch (err) {
    const message = "There was a problem retrieving your activities";
    generateError(message, 404, next);
  }
};

export default {
  editActivity,
  createActivity,
  deleteActivity,
  viewActivity,
  uploadFiles,
  deleteFile,
  generateLiveLink,
  editLiveActivity,
  viewActivities,
  viewAllMyActivities,
};
