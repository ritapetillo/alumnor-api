import express from "express";
import activityController from "../../controllers/activityController";
import { authenticateUser } from "../../middlewares/auth";
import { canDeleteCourse } from "../../middlewares/privileges/course";
import {
  canCreateSection,
  canDeleteSection,
  canEditSection,
} from "../../middlewares/privileges/sections";
const activityRouter = express.Router();

//////////////////PUBLIC ROUTES//////////////////
// VIEW AN ACTIVITY
// api/v1/activities/:id
activityRouter.get("/:id", activityController.viewActivity);

///////////////////PRIVATE ROUTES/////////////////////////
//CREATE AN ACTIVITY
// api/v1/activities/:courseId/new
activityRouter.post(
  "/:courseId/new",
  authenticateUser,
  canCreateSection,
  activityController.createActivity
);

//EDIT AN ACTIVITY
// api/v1/activities/:courseId/edit/:id
activityRouter.put(
  "/:courseId/edit/:id",
  authenticateUser,
  canEditSection,
  activityController.editActivity
);

//DELETE AN ACTIVITY
// api/v1/activities/:courseId/delete/:id
activityRouter.delete(
  "/:courseId/delete/:id",
  authenticateUser,
  canDeleteSection,
  activityController.deleteActivity
);

export default activityRouter;
