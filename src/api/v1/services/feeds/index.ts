import express from "express";
import feedController from "../../controllers/feedController";
import commentController from "../../controllers/commentController";

import parser from "../../helpers/cloudinary/files";
import { authenticateUser } from "../../middlewares/auth";
import {
  canAttendCourse,
  canCreateCourse,
  canEditCourse,
} from "../../middlewares/privileges/course";
import {
  canCreateSection,
  canDeleteSection,
  canEditSection,
} from "../../middlewares/privileges/sections";
// import { canEditOrDeleteFeed } from "../../middlewares/privileges/feeds";
const feedRouter = express.Router();

//////////////////PUBLIC ROUTES//////////////////
//VIEW A SUBMISSION BY COURSE
// api/v1/feed/course/:courseId
feedRouter.get(
  "/course/:courseId/",
  authenticateUser,
  canAttendCourse,
  feedController.viewAllFeedsByCourse
);

//VIEW MY SUBMISSIONS
// api/v1/feed/me
feedRouter.get("/me", authenticateUser, feedController.viewAllMyFeeds);

//VIEW SUBMISSIONS BY USER
// api/v1/feed/:userId
feedRouter.get(
  "/:userId",
  authenticateUser,
  canCreateCourse,
  feedController.viewAllFeedsByUser
);

///////////////////PRIVATE ROUTES/////////////////////////

//CREATE A SUBMISSION
// api/v1/feeds/:courseId/new
feedRouter.post(
  "/:courseId/new",
  authenticateUser,
  // canAttendCourse,
  feedController.createFeed
);
/////COMMENTS

//UPLOAD DOCUMENTS TO A SUBMISSION
// api/v1/feeds/:courseId/new
feedRouter.put(
  "/upload",
  authenticateUser,
  // canAttendCourse,
  parser.single("file"),
  feedController.uploadFileFeed
);
//EDIT A SUBMISSION
// api/v1/feeds/:courseId/edit/:id
feedRouter.put(
  "/:courseId/edit/:id",
  authenticateUser,
  // canEditOrDeleteFeed,
  feedController.editFeed
);

//DELETE A SUBMISSION
// api/v1/feeds/:courseId/delete/:id
feedRouter.delete(
  "/:courseId/delete/:id",
  authenticateUser,
  // canEditOrDeleteFeed,
  feedController.deleteFeed
);

///////////////////////////////////COMMENTS
//CREATE A COMMENT
// api/v1/feeds/:courseId/delete/:id
feedRouter.post(
  "/:courseId/comment/:feedId/new",
  authenticateUser,
  // canAttendCourse,
  commentController.createComment
);
//DELETE A COMMENT
// api/v1/feeds/:courseId/delete/comment/:commentId
feedRouter.delete(
  "/:courseId/comment/:feedId/delete/:commentId",
  authenticateUser,
  // canEditOrDeleteFeed,
  commentController.deleteComment
);

export default feedRouter;
