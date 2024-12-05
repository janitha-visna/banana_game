import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String, // URL for the profile image
      default: "", // Default to an empty string if no image is uploaded
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
