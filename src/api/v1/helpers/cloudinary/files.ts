import cloudinary from "./";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
//multer settings
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "files",
    allowed_formats:["pdf","doc","xsl","jpg","jpeg","png","ppt"]
  },
});
const parser = multer({ storage });

export default parser;
