import express from "express";
import userController from "../../controllers/userController";
import {authenticateUser} from '../../middlewares/auth'
const userRoutes = express.Router();

userRoutes.get("/", userController.getUsers);

userRoutes.get('/me',authenticateUser,userController.getUser)

export default userRoutes;
