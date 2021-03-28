import { Strategy as ZoomStrategy } from "@giorgosavgeris/passport-zoom-oauth2";
import passport from "passport";
import config from "../../../../../../Config";
import { generateZoomCookies } from "../../../cookies/zoomCookies";
interface IZoomProfile {
  _json: {
    id: string,
    email: string,
    personal_meeting_url:string
  }
}
passport.use(
  new ZoomStrategy(
    {
      clientID: config.ZOOM_CLIENT_ID,
      clientSecret: config.ZOOM_CLIENT_SECRET,
      callbackURL: `${config.BE_URI}/api/v1/auth/zoom/callback`,
    },
    async function (
      accessToken: string,
      refreshToken: string,
      profile: IZoomProfile,
      done: any
    ) {
      try {
        //look for an accout with the same existing email and google Id, if I find it
        const tokens = { accessToken, refreshToken }
        const filteredProfile = {
          zoomId: profile._json.id,
          zoomEmail: profile._json.email,
          zoomMeetingRoom: profile._json.personal_meeting_url,
        };
        return done(undefined, { profile:filteredProfile, tokens });
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
