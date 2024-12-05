import React from "react";
import "./Navbar.css";
import { useAuth } from "../../context/AuthContext"; // Import AuthContext
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user, logout } = useAuth(); // Get user and logout function from AuthContext
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <img
          src={user?.profileImage || "/default-profile.png"}
          alt="User Profile"
          className="navbar-profile-image"
        />
        <span className="navbar-username">
          👋 Hello, Welcome {user?.username || "Guest"}!
        </span>
      </div>
      <div className="navbar-right">
        <button className="navbar-logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
