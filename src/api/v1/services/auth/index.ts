import express from "express";
import authController from "../../controllers/authController";
const authRoutes = express.Router();

authRoutes.post("/login", authController.login);
authRoutes.post("/signup", authController.signup);
authRoutes.get("/verify/:token", authController.verifyEmail);
authRoutes.post("/refresh", authController.refreshToken);
authRoutes.post("/reset", authController.sendPasswordResetLink);
authRoutes.post("/new-password", authController.resetPasword);

export default authRoutes;
