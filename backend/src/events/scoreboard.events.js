import EventEmitter from "events";
import { updateScoreboard } from "../services/scoreboard.service.js";
import { recalculateRanks } from "../services/scoreboard.service.js";

const scoreEvents = new EventEmitter();

scoreEvents.on("scoreSubmitted", async (userId, username, score) => {
  try {
    await updateScoreboard(userId,username,score);
    await recalculateRanks();
  } catch (error) {
    console.error("Error updating scoreboard:", error);
  }
});

export default scoreEvents;
