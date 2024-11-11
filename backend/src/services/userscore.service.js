import { UserScore } from "../models/userscore.model.js";

/**
 * Adds a user's score to the user_scores collection.
 * @param {String} userId - The ID of the user.
 * @param {Number} score - The score to add.
 * @param {Date} date - The date of the score (optional).
 */
export async function addUserScore(userId, username, score, date = new Date()) {
  try {
    const userScore = new UserScore({
      userId,
      username,
      score,
      date: date instanceof Date ? date : new Date(date)
    });
    
    await userScore.save();
  } catch (error) {
    console.error("Error adding user score:", error);
    throw new Error("Failed to add user score");
  }
}
