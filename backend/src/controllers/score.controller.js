import { addUserScore } from "../services/userscore.service.js";
import scoreEvents  from "../events/scoreboard.events.js"
import { getUserScoresByUserId } from "../services/userscore.service.js";


export async function submitscore(req, res) {
  const { score, date } = req.body;

  // Log the userId and username from token
  console.log("User ID from token:", req.userId);
  console.log("Username from token:", req.username);

  if (typeof score !== "number" || score < 0) {
    return res.status(400).json({ error: "Invalid score data" });
  }

  try {
    // Use the authenticated user's ID and username from the token
    await addUserScore(req.userId, req.username, score, date);

    // Emit an event for real-time score tracking or notifications
    scoreEvents.emit("scoreSubmitted", req.userId, req.username, score);

    return res.status(200).json({ message: "Score submitted successfully" });
  } catch (error) {
    console.error("Error submitting score:", error);
    return res.status(500).json({ error: "Failed to submit score" });
  }
}

export const getUserScores = async (req, res) => {
  const { userId } = req.query; // Retrieve userId from query parameters

  try {
    // Use the service function to get user scores
    const userScores = await getUserScoresByUserId(userId);
    res.status(200).json(userScores);
  } catch (error) {
    console.error("Error fetching user scores:", error);
    res.status(500).json({ message: "Failed to retrieve user scores" });
  }
};