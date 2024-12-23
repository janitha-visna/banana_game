import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./singleplayer.scss";
import { useAuth } from "../../context/AuthContext";
import { calculateFinalScore } from "../../utils/scoring";
import { useNavigate } from "react-router-dom";

const Singleplayer = () => {

  const navigate = useNavigate(); // Initialize navigate hook

  const handleNavigateLogin = () => {
    navigate("/play"); // Navigate to the login page
  };

  const handleNavigateSelectOption = () => {
    navigate("/selectoption"); // Navigate to the select option page
  };

  const location = useLocation();
  const { selectedRounds, selectedChances } = location.state || {
    selectedRounds: 1,
    selectedChances: 1,
  };

  const { user } = useAuth();

  const { username, id: userId } = user || {}; // Extract username and userId

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
    const isCorrect = parseInt(number) === solution;

    if (isCorrect) {
      setRoundsLeft((prevRounds) => prevRounds - 1);
    } else {
      setRoundsLeft((prevRounds) => prevRounds - 1);
      setChancesLeft((prevChances) => prevChances - 1);
    }

    // Render a new image regardless of correctness
    setUserAnswer("");
    fetchQuestion(); // Fetch the next question
  };

  // Calculate score when game is over
  useEffect(() => {
    if (roundsLeft === 0 || chancesLeft === 0) {
      calculateScore();
    }
  }, [roundsLeft, chancesLeft]);

  const calculateScore = () => {
    const finalScore = calculateFinalScore(
      roundsLeft,
      chancesLeft,
      stopwatchTime
    );
    setScore(finalScore);
    submitScore(finalScore);
  };

  // Submit score function
  const submitScore = async (finalScore) => {
    const scoreData = {
      score: finalScore,
      date: new Date().toISOString(), // Current date and time in ISO format
    };

    try {
      // Make the POST request with cookies automatically included
      await axios.post("http://localhost:8800/add-score/add-score", scoreData, {
        withCredentials: true, // Allow sending cookies (including httpOnly)
      });
      console.log("Score submitted successfully:", scoreData);
    } catch (error) {
      console.error("Error submitting score:", error);
    }
  };

  return (
    <div className="singleplayer">
      {roundsLeft > 0 && chancesLeft > 0 ? (
        <>
          <div className="info-wrapper">
            <div className="info">
              <div className="time">Time: {stopwatchTime} seconds</div>{" "}
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
        <>
          <p className="game-over">
            Game Over!{" "}
            {roundsLeft === 0 ? "No rounds left." : "No chances left."}
          </p>
          <p className="final-score">Final Score: {score}</p>
          <div className="game-over-actions">
            <button onClick={handleNavigateLogin} className="action-button">
              Homapage
            </button>
            <button
              onClick={handleNavigateSelectOption}
              className="action-button"
            >
              Play Again
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Singleplayer;
