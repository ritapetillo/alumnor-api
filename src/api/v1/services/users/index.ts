import express, { NextFunction } from "express";
import userController from "../../controllers/userController";
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


export default userRoutes;
