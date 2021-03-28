import express, { NextFunction } from "express";
import userController from "../../controllers/userController";
import parser from "../../helpers/cloudinary/user";
import { RequestUser } from "../../interfaces/IRequest";
import {authenticateUser} from '../../middlewares/auth'
const userRoutes = express.Router();

userRoutes.get("/", userController.getUsers);

//get current user
//GET api/v1/users/me
userRoutes.get('/me', authenticateUser, userController.getUser)

//edit current user
//PUT api/v1/users/edit
userRoutes.put("/edit", authenticateUser, userController.editCurrentUser);

//delete current user
//DELETE api/v1/users/delete
userRoutes.delete("/delete", authenticateUser, userController.deleteCurrentUser);

//POST api/v1/users/picture
userRoutes.post('/picture', authenticateUser,parser.single('picture'), userController.uploadPicture)

//POST api/v1/users/current-url/:url
userRoutes.post(
  "/current-url",
  userController.getCurrentUrl
);
export default userRoutes;
