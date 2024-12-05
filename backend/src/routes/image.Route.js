import express from "express";
import multer from "multer";
import { uploadProfileImage } from "../controllers/image.Controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

// Set up Multer to handle file uploads in memory (without saving to disk)
const storage = multer.memoryStorage(); // Store file in memory (RAM)

const upload = multer({ storage });

const router = express.Router();

// Add the verifyToken middleware before the image upload handler
router.post("/upload-image", verifyToken, upload.single("profilePic"), (req, res, next) => {
  console.log("Incoming file:", req.file); // Log the uploaded file details
  next();
}, uploadProfileImage);

export default router;