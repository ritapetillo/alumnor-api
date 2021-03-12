import express from "express";
import authController from "../../controllers/authController";
import passport from "passport";
const authRouter = express.Router();

//EMAIL AND PASSWORKD AUTH
authRouter.post("/login", authController.login);
authRouter.post("/signup", authController.signup);
authRouter.get("/verify/:token", authController.verifyEmail);
authRouter.post("/refresh", authController.refreshToken);
authRouter.post("/reset", authController.sendPasswordResetLink);
authRouter.post("/new-password", authController.resetPasword);

//GOOGLE AUTH
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  authController.googleAuthCallback
);
export default authRouter;
