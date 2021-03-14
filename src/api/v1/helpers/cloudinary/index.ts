import config from "../../../../Config";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.CLOUD_API_KEY,
  api_secret: config.CLOUD_API_SECRET,
});

export default cloudinary;
