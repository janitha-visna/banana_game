import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";


export const registerUser = async (username, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10); // Hash password
  const newUser = new User({ username, email, password: hashedPassword });

  await newUser.save(); // Save user to DB
};


export const loginUser = async (username, password) => {
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error("Invalid Credentials!"); // Throw error for invalid username
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid Credentials!"); // Throw error for invalid password
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );

  return {
    token,
    user: {
      username: user.username, // Add the username
      imageUrl: user.imageUrl, // Add the imageUrl property
    },
  };
};