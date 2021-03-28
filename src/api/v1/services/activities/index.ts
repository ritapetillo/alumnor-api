import express from "express";
import activityController from "../../controllers/activityController";
import parser from "../../helpers/cloudinary/files";
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
  "/:courseId/:sectionId/",
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

//EDIT AN ACTIVITY
// api/v1/activities/:courseId/edit-live/:id
activityRouter.put(
  "/:courseId/edit-live/:id",
  authenticateUser,
  canEditSection,
  activityController.editLiveActivity
);

//GENERATE LIVE ZOOM LINK
// api/v1/activities/:courseId/edit/:id
activityRouter.post(
  "/:courseId/:id/zoom-link",
  authenticateUser,
  canEditSection,
  activityController.generateLiveLink
);

//UPLOAD FILES
// api/v1/activities/:courseId/edit/:id
activityRouter.post(
  "/:courseId/:id/upload",
  authenticateUser,
  canEditSection,
  parser.array("files"),
  activityController.uploadFiles
);

//DELETE FILE
// api/v1/activities/:courseId/:id/file/delete
activityRouter.put(
  "/:courseId/:id/file/delete",
  authenticateUser,
  canEditSection,
  activityController.deleteFile
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
