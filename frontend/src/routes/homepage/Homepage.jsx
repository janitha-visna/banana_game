import Leaderboard from "../../components/leaderboard/Leaderbord";
import styles from "./homepage.module.css";
import leaderboardData from "../../components/leaderboard/leaderboardData";
import Login from "../Login/Login";
import HamburgerMenu from "../../components/HamburgerMenu/HamburgerMenu";
import { useNavigate } from "react-router-dom";
import Selectoptions from "../../components/options/Selectoptions";

function Homepage() {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div className={styles.homepage}>
      <div
        className={styles.box}
        onClick={() => handleClick("/selectoption")} // Navigate to Component1
      >
        Single Player
      </div>
      <div
        className={styles.box}
        onClick={() => handleClick("/component2")} // Navigate to Component2
      >
        Multi Player
      </div>
    </div>
  );
}

export default Homepage;