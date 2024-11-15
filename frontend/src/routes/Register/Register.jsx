import React, { useState } from "react";
import axios from "axios";
import "./register.scss";
import { Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [notification, setNotification] = useState(""); // Holds the success message
  const [error, setError] = useState(""); // Holds the error message

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError("");
    setNotification(""); // Clear any previous notification

    try {
      const response = await axios.post(
        "http://localhost:8800/api/auth/register",
        formData
      );

      console.log(response); // Log the response to ensure it's coming back correctly

      if (response.status === 200) {
        setNotification(
          response.data.message || "Account created successfully!"
        ); // Use server response message
      }
    } catch (err) {
      console.error("Error during registration:", err); // Log any error for debugging
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  // Dismiss notification
  const handleDismiss = () => {
    setNotification("");
    setError("");
  };

  return (
    <div className="register">
      {(notification || error) && (
        <div
          className={`notification-banner ${
            notification ? "success" : "error"
          }`}
        >
          <span>{notification || error}</span>
          <button className="dismiss-btn" onClick={handleDismiss}>
            &times;
          </button>
        </div>
      )}
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            name="email"
            type="text"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit">Register</button>
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
