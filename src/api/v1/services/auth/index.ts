import express from "express";
import authController from "../../controllers/authController";
import passport from "passport";
import { authenticateUser } from "../../middlewares/auth";
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

//FACEBOOK AUTH
authRouter.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);
authRouter.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  authController.facebookAuthCallback
);

authRouter.get("/zoom", passport.authenticate("zoom"));

authRouter.get(
  "/zoom/callback",
  passport.authenticate("zoom", { failureRedirect: "/login" }),
  authController.zoomAuthCallback
);

authRouter.post(
  "/zoom/refresh",
  authenticateUser,
  authController.zoomRefreshToken
);

authRouter.put(
  "/zoom/link-account",
  authenticateUser,
  authController.linkUserWithZoom
);

// authRouter.get("/zoom", async (req, res, next) => {
//   res.redirect(`https://zoom.us/oauth/authorize?response_type=code&client_id=${Config.ZOOM_CLIENT_ID}&redirect_uri=${Config.BE_URI}/api/v1/auth/zoom/callback
// `);
// });

export default authRouter;
