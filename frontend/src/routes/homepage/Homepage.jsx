import Leaderboard from "../../components/leaderboard/Leaderbord";
import styles from "./homepage.module.css";
import leaderboardData from "../../components/leaderboard/leaderboardData";
import Login from "../Login/Login";

function Homepage() {
  return (
    <div className={styles.homepage}>
      <div className={styles.left}>
        <Login />
      </div>
      <div className={styles.right}></div>
    </div>
  );
}

export default Homepage;