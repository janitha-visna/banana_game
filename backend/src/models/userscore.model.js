import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Define the UserScore schema
const userScoreSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  username: {
    // Add the username field
    type: String,
    required: true, // Make it required if you always want it to be available
  },
  score: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

// Create and export the UserScore model
export const UserScore = model("UserScore", userScoreSchema);
