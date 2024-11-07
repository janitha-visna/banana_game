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

  useEffect(() => {
    fetchQuestion();
  }, []);

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

  const handleSubmit = () => {
    if (parseInt(userAnswer) === solution) {
      setRoundsLeft((prevRounds) => prevRounds - 1);
      fetchQuestion();
    } else {
      setChancesLeft((prevChances) => prevChances - 1);
    }
    setUserAnswer("");
  };

  return (
    <div className="singleplayer">
      <div className="info">
        <div className="left">
          <div className="score">score</div>
          <div className="time">time</div>
        </div>
        <right className="right">
          <div className="chances">
            <p>Chances left: {chancesLeft}</p>
          </div>
          <div className="round">
            <p>Rounds left: {roundsLeft}</p>
          </div>
        </right>
      </div>
      {roundsLeft > 0 && chancesLeft > 0 ? (
        <>
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
        </p>
      )}
    </div>
  );
};

export default Singleplayer;
