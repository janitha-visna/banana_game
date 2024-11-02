import Leaderboard from "../../components/leaderboard/Leaderbord";
import "./homepage.scss";
import leaderboardData from "../../components/leaderboard/leaderboardData"

function Homepage() {
  return (
    <div className="homepage">
      <div className="left">
        <div className="left-top">
          
        </div>
        <div className="left-bottom">

        </div>
      </div>
      <div className="right">
        <div className="wrapper">
          <Leaderboard data={leaderboardData} />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
