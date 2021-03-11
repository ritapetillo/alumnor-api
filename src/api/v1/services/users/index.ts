import express from "express";
import userController from "../../controllers/userController";
const userRoutes = express.Router();

userRoutes.get("/", userController.getUsers);

export default userRoutes;
