import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./singleplayer.scss";

const Singleplayer = () => {
  const location = useLocation();
  const { selectedRounds, selectedChances } = location.state || {
    selectedRounds: 1,
    selectedChances: 1,
  };

  const [questionImage, setQuestionImage] = useState("");
  const [solution, setSolution] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [roundsLeft, setRoundsLeft] = useState(selectedRounds);
  const [chancesLeft, setChancesLeft] = useState(selectedChances);
  const [stopwatchTime, setStopwatchTime] = useState(0); // Stopwatch starting at 0 seconds
  const [score, setScore] = useState(0); // Score state

  useEffect(() => {
    fetchQuestion();

    // Start the stopwatch
    const stopwatch = setInterval(() => {
      setStopwatchTime((prevTime) => prevTime + 1);
    }, 1000);

    // Clear the stopwatch interval when game ends or component unmounts
    return () => clearInterval(stopwatch);
  }, []); // Empty dependency array ensures the stopwatch starts only once

  const fetchQuestion = async () => {
    try {
      const response = await axios.get(
        "https://marcconrad.com/uob/banana/api.php"
      );
      setQuestionImage(response.data.question);
      setSolution(response.data.solution);
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  const handleNumberClick = (number) => {
    setUserAnswer(number);
    handleSubmit(number);
  };

  const handleSubmit = (number) => {
    if (parseInt(number) === solution) {
      setRoundsLeft((prevRounds) => prevRounds - 1);
      fetchQuestion();
    } else {
      setChancesLeft((prevChances) => prevChances - 1);
    }
    setUserAnswer("");
  };

  // Calculate score when game is over
  useEffect(() => {
    if (roundsLeft === 0 || chancesLeft === 0) {
      calculateScore();
    }
  }, [roundsLeft, chancesLeft]);

  // Scoring logic
  const calculateScore = () => {
    const baseScore = 1000;
    const roundBonus = roundsLeft * 100; // Bonus for remaining rounds
    const chanceBonus = chancesLeft * 50; // Bonus for remaining chances
    const timePenalty = Math.floor(stopwatchTime / 2); // Penalty for time taken

    const finalScore = baseScore + roundBonus + chanceBonus - timePenalty;
    setScore(finalScore > 0 ? finalScore : 0); // Ensure score doesn’t go below 0
    submitScore(finalScore);
  };

  // Submit score function
  const submitScore = async (finalScore) => {
    const scoreData = {
      userId: "741", // Hardcoded userId for now
      username: "amal", // Hardcoded username
      score: finalScore,
      date: new Date().toISOString(), // Current date and time in ISO format
    };

    try {
      await axios.post("http://localhost:8800/add-score/add-score", scoreData);
      console.log("Score submitted successfully:", scoreData);
    } catch (error) {
      console.error("Error submitting score:", error);
    }
  };

  return (
    <div className="singleplayer">
      {roundsLeft > 0 && chancesLeft > 0 ? (
        <>
          <div className="info">
            <div className="left">
              <div className="score">score</div>
              <div className="time">Time: {stopwatchTime} seconds</div>{" "}
              {/* Display stopwatch time */}
            </div>
            <div className="right">
              <div className="chances">
                <p>Chances left: {chancesLeft}</p>
              </div>
              <div className="round">
                <p>Rounds left: {roundsLeft}</p>
              </div>
            </div>
          </div>

          <div className="question">
            <div className="question-container">
              <img src={questionImage} alt="Math Question" />
            </div>
          </div>
          <div className="solution">
            <div className="number-buttons">
              {[...Array(10).keys()].map((number) => (
                <button key={number} onClick={() => handleNumberClick(number)}>
                  {number}
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <p>
          Game Over! {roundsLeft === 0 ? "No rounds left." : "No chances left."}
          <p>Final Score: {score}</p> {/* Display final score at game over */}
        </p>
      )}
    </div>
  );
};

export default Singleplayer;
