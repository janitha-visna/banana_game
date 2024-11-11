import { addUserScore } from "../services/userscore.service.js";
import scoreEvents  from "../events/scoreboard.events.js"


export async function submitscore(req,res) {

    const { userId, username, score, date } = req.body;

    if (!userId || typeof score !== "number") {
      return res.status(400).json({ error: "Invalid data" });
    }
    
    try {
        await addUserScore(userId,username,score,date);
         scoreEvents.emit("scoreSubmitted", userId, username, score);
         res.status(200).json({ message: "Score submitted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to submit scoreq" });
    }
    
}