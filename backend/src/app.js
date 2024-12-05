import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./lib/db.js"; // Import the DB connection
import authRoute from "./routes/auth.route.js";
import userscore from "./routes/user.route.js"
import { Server } from 'socket.io';  // Socket.io import
import http from 'http'; // HTTP server import
import imageRoutes from "./routes/image.Route.js"
import { handleSocketConnection } from "./socket/scoreboard.scoket.js";



const app = express();

// Connect to MongoDB
connectDB();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());



app.use("/api/auth", authRoute);
app.use("/add-score",userscore);
app.use("/api/users/images", imageRoutes); 


// Create HTTP server for both Express and Socket.io
const server = http.createServer(app);

// Initialize Socket.io server
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

// Handle Socket.IO connections
io.on("connection", (socket) => {
  handleSocketConnection(socket); // Delegate connection handling to the imported function
});

// Start the server
server.listen(8800, () => {
  console.log("Server running on http://localhost:8800");
});