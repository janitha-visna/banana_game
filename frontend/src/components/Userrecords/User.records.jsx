import React, { useEffect, useState } from "react";
import "./records.css";

function Records() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    // Fetch the data from the API
    fetch("http://localhost:8800/add-score/user-score?userId=741")
      .then((response) => response.json())
      .then((data) => setScores(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <h1>Score History</h1>
      <table className="container">
        <thead>
          <tr>
            <th>
              <h1>Score</h1>
            </th>
            <th>
              <h1>Date</h1>
            </th>
          </tr>
        </thead>
        <tbody>
          {scores.map((record) => (
            <tr key={record._id}>
              <td>{record.score}</td>
              <td>{new Date(record.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Records;
