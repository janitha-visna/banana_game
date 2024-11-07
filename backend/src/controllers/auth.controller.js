// controllers/auth.controller.js
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import User from "../models/user.model.js"; // Import the User model

/**
 * @function register
 * @description Registers a new user by hashing the password and saving the user in the database.
 * @param {Object} req - The request object containing user data.
 * @param {Object} res - The response object to send back the results.
 * @returns {void}
 */


// Register function
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // HASH THE PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE A NEW USER AND SAVE TO DB
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create user!" });
  }
};



/**
 * @function
 * @description Logs in a user by verifying the credentials and generating a JWT token.
 * @param {Object} req - The request object containing username and password.
 * @param {Object} res - The response object to send back the results.
 * @returns {void}
 */

// Login function
export const login = async (req, res) => {
  const { username, password } = req.body;

  // Log the received username and password (avoid logging passwords in production)
  console.log("Received login request with username:", username);

  try {
    // CHECK IF THE USER EXISTS
    const user = await User.findOne({ username });

    // Log the result of the user search
    console.log("User found:", user);

    if (!user) {
      console.log("Invalid Credentials: User not found");
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    // CHECK IF THE PASSWORD IS CORRECT
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Log password validation result
    console.log("Password valid:", isPasswordValid);

    if (!isPasswordValid) {
      console.log("Invalid Credentials: Password does not match");
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    // GENERATE JWT TOKEN
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    // Log the generated token (avoid logging sensitive information in production)
    console.log("Generated token for user:", user._id);

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
      .status(200)
      .json({
        message: "Login Successful",
        user: { id: user._id, username: user.username },
      });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Failed to login!" });
  }
};


/**
 * @function
 * @description Logs out a user by clearing the JWT cookie.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object to send back the results.
 * @returns {void}
 */

// Logout function
export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};
