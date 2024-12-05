import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "./Playgame.css";

function Playgame() {
  const navigate = useNavigate(); // Initialize navigate hook

  // Function to handle redirection when "User Records" button is clicked
  const handleUserRecordsClick = () => {
    navigate("/records"); // Redirect to /records route
  };

  // Function to handle redirection when "Play Now" button is clicked
  const handlePlayNowClick = () => {
    navigate("/selectoption"); // Redirect to /selectoption route
  };

  const handleScoreboard = () =>{
    navigate("/leaderboard");
  };

  return (
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
  );
}

export default Playgame;
