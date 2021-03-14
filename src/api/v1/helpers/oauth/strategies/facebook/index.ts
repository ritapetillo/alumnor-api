import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import config from "../../../../../../Config";
import User from "../../../../models/User";
import { generateTokens } from "../../../tokens";
// const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET }= process.env

passport.use(
  "facebook",
  new FacebookStrategy(
    {
      clientID: config.FACEBOOK_APP_ID!,
      clientSecret: config.FACEBOOK_APP_SECRET!,
      callbackURL: `${config.BE_URI}/api/v1/auth/facebook/callback`,
      profileFields: ["id", "displayName", "email", "picture", "name"],
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        //look for an accout with the same existing email and google Id, if I find it
        const user = await User.findOrCreate("facebookId", profile, profile.id);
        if (!user) throw Error;
        const { _id } = user;
        const email = user.email.toString();
        const tokens = await generateTokens({ _id, email });
        if (!tokens) throw Error;
        return done(undefined, { user, tokens });
      } catch (err) {
        console.log(err);
        done(err, undefined);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});
