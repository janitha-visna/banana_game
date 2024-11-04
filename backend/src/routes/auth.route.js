// routes/auth.route.js
import express from "express";
import { login, logout, register } from "../controllers/auth.controller.js";

const router = express.Router();

/**
 * @function
 * @description Registers a new user.
 * @route POST /api/auth/register
 * @param {string} username - The username of the user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 */

// Route for user registration
router.post("/register", register);

// Route for user login
router.post("/login", login);

// Route for user logout
router.post("/logout", logout);

export default router;
