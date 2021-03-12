import User from "../../../../models/User";
import IUser from "../../../../interfaces/IUser";
import { IGoogleProfile } from "../../../../interfaces/IStrategies";

export const createNewGoogleUser = async (profile: IGoogleProfile) => {
  try {
    const { email, given_name, family_name, picture, sub } = profile;
    const newUser: IUser = new User({
      firstName: given_name,
      lastName: family_name,
      picture,
      email,
      googleId: sub,
      role: "student",
      verified: "true",
    });
    const savedUser: IUser = await newUser.save();

    return savedUser;
  } catch (err) {
    
    return null;
  }
};
