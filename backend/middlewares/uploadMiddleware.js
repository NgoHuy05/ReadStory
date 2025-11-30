import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "story_banners", 
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

export const upload = multer({ storage });


