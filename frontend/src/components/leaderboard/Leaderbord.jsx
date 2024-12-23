import React, { useEffect, useState } from "react";
import "./leaderboard.css";
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
    <>
      <h1>Score History</h1>
      <table className="container">
        <thead>
          <tr>
            <th>
              <h1>Rank</h1>
            </th>
            <th>
              <h1>Name</h1>
            </th>
            <th>
              <h1>Score</h1>
            </th>
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
    </>
  );
};

export default Leaderboard;
