import cloudinary from "cloudinary";
import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Test Cloudinary connection
const testCloudinaryConnection = async () => {
  try {
    const result = await cloudinary.v2.api.ping();
    console.log("Cloudinary connected successfully:", result);
  } catch (error) {
    console.error("Cloudinary connection failed:", error);
  }
};

testCloudinaryConnection();

export default cloudinary;
