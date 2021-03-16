import User from "../../../../models/User/User";
import IUser from "../../../../interfaces/IUser";
import { IFacebookPayload } from "../../../../interfaces/IStrategies";

export const createNewFbUser = async (profile: IFacebookPayload) => {
  try {
    const { email, last_name, first_name, id } = profile._json;
    const picture = profile.photos[0].value;
    const newUser: IUser = new User({
      firstName: first_name,
      lastName: last_name,
      picture,
      email,
      facebookId: id,
      role: "student",
      verified: "true",
    });
    const savedUser: IUser = await newUser.save();

    return savedUser;
  } catch (err) {
    return null;
  }
};
