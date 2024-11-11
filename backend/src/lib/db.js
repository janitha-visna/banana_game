// lib/db.js
import mongoose from "mongoose";
import dotenv from "dotenv"; // Import dotenv

dotenv.config(); // Load environment variables from .env file

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

export default connectDB;

export const db = () => client.db("your_db_name"); // Replace with your actual database name
