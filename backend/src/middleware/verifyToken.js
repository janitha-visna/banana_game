import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Not Authenticated!" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Ensure the user exists in the database
    const user = await User.findById(payload.id);
    if (!user) return res.status(404).json({ message: "User not found!" });

    // Attach the user ID to the request
    req.userId = payload.id;
    req.username = payload.username; // Optional: If you need the username
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired!" });
    }
    return res.status(403).json({ message: "Token is not valid!" });
  }
};
