import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import config from "../../../../../../Config";
import User from "../../../../models/User/User";
import { generateTokens } from "../../../tokens";
// const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET }= process.env

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID!,
      clientSecret: config.GOOGLE_CLIENT_SECRET!,
      callbackURL: `/api/v1/auth/google/callback`,
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        //look for an accout with the same existing email and google Id, if I find it
        const user = await User.findOrCreate(
          "googleId",
          profile._json,
          profile.id
        );
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
