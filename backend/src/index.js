import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./lib/db.js"; // Import the DB connection
import authRoute from "./routes/auth.route.js";
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

app.listen(8800, () => {
  console.log("Server is running!");
});
