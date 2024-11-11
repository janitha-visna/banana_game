// models/Scoreboard.js
import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Define the Scoreboard schema
const scoreboardSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
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
  rank: {
    type: Number,
    default: null,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the Scoreboard model
export const Scoreboard = model("Scoreboard", scoreboardSchema);
