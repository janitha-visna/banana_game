import React from "react";
import "./Navbar.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleAvatarClick = () => {
    navigate("/upload"); // Navigate to the upload route
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <div onClick={handleAvatarClick} className="navbar-avatar-clickable">
          <img
            src={user?.imageUrl || "/default-profile.png"} // Use the imageUrl field
            alt="User Profile"
            className="navbar-profile-image"
          />
        </div>
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
