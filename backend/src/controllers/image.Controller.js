import User from "../models/user.model.js";
import uploadImage from "../services/imageUpload.service.js";

const uploadProfileImage = async (req, res) => {
  try {
    const userId = req.userId; // Assuming the user is authenticated and we have access to their ID
    const file = req.file; // File will be available if using Multer for file upload in memory

    // Check if the file exists
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("File uploaded:", file); // Log the file information to check if it's correct

    // Upload image to Cloudinary using the in-memory file buffer
    const imageUrl = await uploadImage(file.buffer);

    // Update the user's profile with the image URL
    const user = await User.findByIdAndUpdate(
      userId,
      { imageUrl }, // Update the imageUrl field
      { new: true } // Return the updated user document
    );

    res.status(200).json({ message: "Image uploaded successfully", user });
  } catch (error) {
    console.error("Error uploading image:", error.message); // Log the error message
    res
      .status(500)
      .json({ message: "Internal Server Error: " + error.message });
  }
};

export { uploadProfileImage };
