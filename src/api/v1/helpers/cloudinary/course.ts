import cloudinary from "./";
import multer from 'multer'
import  { CloudinaryStorage } from "multer-storage-cloudinary";
//multer settings
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "courses",
  },
});
const parser = multer({ storage });

export default parser;
