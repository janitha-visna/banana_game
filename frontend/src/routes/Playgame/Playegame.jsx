import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "./Playgame.css";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar/Navbar";

function Playgame() {
  const navigate = useNavigate(); // Initialize navigate hook
  const { logout } = useAuth(); // Get logout function from AuthContext

  // Function to handle redirection when "User Records" button is clicked
  const handleUserRecordsClick = () => {
    navigate("/records"); // Redirect to /records route
  };

  // Function to handle redirection when "Play Now" button is clicked
  const handlePlayNowClick = () => {
    navigate("/selectoption"); // Redirect to /selectoption route
  };

  const handleScoreboard = () => {
    navigate("/leaderboard");
  };

  // Function to handle logout
  const handleLogout = async () => {
    try {
      // Clear server-side token if required
      const response = await fetch("http://localhost:8800/api/auth/logout", {
        method: "POST",
        credentials: "include", // Ensures cookies are cleared
      });

      if (response.ok) {
        logout(); // Clear user context and local storage
        navigate("/login"); // Redirect to login page
      } else {
        console.error("Failed to log out.");
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };

 return (
    <div>
      <Navbar /> {/* Add the Navbar component */}
      <div className="playgame">
        <div className="left-buttons">
          <button className="button" onClick={handleUserRecordsClick}>
            User Records
          </button>
          <button className="button" onClick={handleScoreboard}>
            Scoreboard
          </button>
        </div>
        <div className="right-buttons">
          <button className="button" onClick={handlePlayNowClick}>
            Play Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Playgame;