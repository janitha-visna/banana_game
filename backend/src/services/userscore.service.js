import { UserScore } from "../models/userscore.model.js";
import { Scoreboard } from "../models/scoreboard.model.js";


export async function addUserScore(userId, username, score, date = new Date()) {
  try {
    // Ensure date is a valid Date object
    const parsedDate = date instanceof Date ? date : new Date(date);

    // Construct a new UserScore document
    const userScore = new UserScore({
      userId,
      username,
      score,
      date: parsedDate,
    });

    // Save the score to the database
    await userScore.save();
    console.log("User score saved successfully:", userScore);
  } catch (error) {
    console.error("Error adding user score:", error);
    throw new Error("Failed to add user score");
  }
}

// Service function to retrieve user scores
export const getUserScoresByUserId = async (userId) => {
  try {
    // Fetch scores for the authenticated user, sorted by date in descending order
    const userScores = await UserScore.find({ userId })
      .select("score date") // Include only necessary fields
      .sort({ date: -1 }); // Sort by most recent first

    return userScores;
  } catch (error) {
    console.error("Error in getUserScoresByUserId:", error);
    throw error; // Re-throw error to be handled by the controller
  }
};


export const getAllScores = async () => {
  try {
    // Fetch scores sorted by 'score' in ascending order
    const scores = await Scoreboard.find().sort({ rank: 1 });
    return scores;
  } catch (error) {
    console.error("Error fetching scores from scoreboard:", error);
    throw new Error("Failed to fetch scores");
  }
};
