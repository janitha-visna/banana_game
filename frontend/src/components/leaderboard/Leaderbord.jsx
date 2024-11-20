import React, { useEffect, useState } from "react";
import "./leaderboard.module.scss";
import leaderboardData from "../leaderboard/leaderboardData.js";
import io from "socket.io-client";


const SOCKET_SERVER_URL = "http://localhost:8800"; // Replace with your backend server URL
const Leaderboard = ({ data }) => {
  const [scoreboard,setScoreboard] = useState([]);

  useEffect(() => {
    // Connect to the Socket.io server without authentication
    const socket = io(SOCKET_SERVER_URL);
    // Emit event to request the scoreboard data initially
    socket.emit("fetchScoreboard");

    // Listen for the 'scoreboardData' event and update state when new data arrives
    socket.on("scoreboardData", (data) => {
      setScoreboard(data);
    });

    // Refresh the scoreboard every 2 seconds by emitting the fetch event again
    const intervalId = setInterval(() => {
      socket.emit("fetchScoreboard");
    }, 2000); // 2-second interval

    // Cleanup when the component unmounts (disconnect from the server and clear interval)
    return () => {
      socket.disconnect();
      clearInterval(intervalId); // Clear the interval to prevent memory leaks
    };
  }, []);
  
  return (
    <div className="leaderboard-container">
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {scoreboard.map((player) => (
            <tr key={player.userId}>
              <td>{player.rank}</td>
              <td>{player.username}</td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
