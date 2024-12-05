import path from "path"; // Import the path module
import { fileURLToPath } from "url"; // Import the necessary function
import { dirname } from "path"; // Import dirname function from path module
import cloudinary from "../lib/cloudinaryConfig.js";
import fs from "fs-extra"; // Use fs-extra for easy file system operations

// Get the current directory path from import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the temporary directory where images will be stored
const tempDir = path.join(__dirname, "temp_images");

// Service to upload image to Cloudinary
const uploadImage = async (fileBuffer) => {
  try {
    // Ensure the temp directory exists, create it if it doesn't
    await fs.ensureDir(tempDir);

    // Create a temporary file path to store the image
    const tempFilePath = path.join(tempDir, `temp_${Date.now()}.jpg`);

    // Write the buffer to the temporary file
    await fs.writeFile(tempFilePath, fileBuffer);

    // Upload image to Cloudinary using the file path (temp file)
    const result = await cloudinary.v2.uploader.upload(tempFilePath, {
      resource_type: "auto", // Auto-detect resource type (image, video, etc.)
      folder: "user_images", // Optional: Folder name in Cloudinary
      public_id: `user_${Date.now()}`, // Optionally, generate a unique name
    });

    // Delete the temporary file after upload
    await fs.remove(tempFilePath);

    // Return the secure URL of the uploaded image
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error.message); // Log the error
    throw new Error("Image upload failed: " + error.message);
  }
};

export default uploadImage;
