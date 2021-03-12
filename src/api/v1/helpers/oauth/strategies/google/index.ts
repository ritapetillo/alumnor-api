import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import config from "../../../../../../Config";
// const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET }= process.env

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID!,
      clientSecret: config.GOOGLE_CLIENT_SECRET!,
      callbackURL: `${config.BE_URI}/api/v1/auth/google/callback`,
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //     return cb(err, user);
      //   });
    }
  )
);
