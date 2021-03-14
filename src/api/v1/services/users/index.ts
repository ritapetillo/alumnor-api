import express, { NextFunction } from "express";
import userController from "../../controllers/userController";
import { RequestUser } from "../../interfaces/IRequest";
import {authenticateUser} from '../../middlewares/auth'
const userRoutes = express.Router();

userRoutes.get("/", userController.getUsers);

userRoutes.get('/me', authenticateUser, userController.getUser)

userRoutes.put("/edit", authenticateUser, userController.editUser);


export default userRoutes;
