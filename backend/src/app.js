import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./lib/db.js"; // Import the DB connection
import authRoute from "./routes/auth.route.js";
import userscore from "./routes/user.route.js"
import { Server } from 'socket.io';  // Socket.io import
import http from 'http'; // HTTP server import
import { Scoreboard } from "./models/scoreboard.model.js";
import { getUserScores } from "./controllers/score.controller.js";
// ... other imports

/**
 *  @function
 * @description Initializes the Express application and sets up middleware and routes.
 */

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
// ... other routes
app.use("/add-score",userscore);


// Create HTTP server for both Express and Socket.io
const server = http.createServer(app);

// Initialize Socket.io server
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

// Handle socket connection
io.on("connection", (socket) => {
  console.log("New user connected via socket:", socket.id);

  // Listen for 'fetchScoreboard' event and send updated scoreboard to client
  socket.on("fetchScoreboard", async () => {
    try {
      // Fetch and send the updated scoreboard
      const scoreboard = await Scoreboard.find().sort({ score: -1 });
      socket.emit("scoreboardData", scoreboard); // Emit the scoreboard data to the client
    } catch (error) {
      console.error("Error fetching scoreboard:", error);
      socket.emit("error", "Failed to fetch scoreboard");
    }
  });

  // Handle socket disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start the server
server.listen(8800, () => {
  console.log("Server running on http://localhost:8800");
});