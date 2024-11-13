// scoreboard.socket.js
import { Scoreboard } from "../models/scoreboard.model.js"; // Import the scoreboard model

// Function to handle the socket logic
export const handleSocketConnection = (socket) => {
  console.log("New user connected via socket:", socket.id);

  // Listen for 'fetchScoreboard' event and send updated scoreboard to client
  socket.on("fetchScoreboard", async () => {
    try {
      const scoreboard = await Scoreboard.find().sort({ score: -1 });
      socket.emit("scoreboardData", scoreboard); // Send updated scoreboard to client
    } catch (error) {
      console.error("Error fetching scoreboard:", error);
      socket.emit("error", "Failed to fetch scoreboard");
    }
  });

  // Handle socket disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
};
