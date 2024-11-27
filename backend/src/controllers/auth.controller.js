import { registerUser,loginUser } from "../services/auth.service.js";



/**
 * @function
 * @description Registers a new user by delegating logic to the service layer.
 */
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    await registerUser(username, email, password); // Call service function

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create user!" });
  }
};

/**
 * @function
 * @description Logs in a user by delegating logic to the service layer.
 */
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const { token, user } = await loginUser(username, password); // Call service function

    console.log(token);

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
      .status(200)
      .json({
        message: "Login Successful",
        user,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to login!" });
  }
};

/**
 * @function
 * @description Logs out a user by clearing the JWT cookie.
 */
export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};