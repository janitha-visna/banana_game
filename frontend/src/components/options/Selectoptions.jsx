import React from "react";
import "./selectoptions.scss";
import { useState } from "react";
import Game from "../singleplayer/Singleplayer";
import { useNavigate } from "react-router-dom";

const Selectoptions = () => {
  const [selectedRounds, setSelectedRounds] = useState(null);
  const [selectedChances, setSelectedChances] = useState(null);

  const navigate = useNavigate();

  const roundsOptions = [2, 3, 5];
  const chancesOptions = [2, 3, 5];

  const handleRoundSelection = (round) => {
    setSelectedRounds(round);
  };

  const handleChanceSelection = (chance) => {
    setSelectedChances(chance);
  };

  const handleStartGame = () => {
    navigate("/singleplayer", { state: { selectedRounds, selectedChances } });
  };

  return (
    <div className="homepage">
      <div className="right_selectoptions">
        <div>
          <h3>Select Rounds and Chances</h3>
        </div>
        <div className="wrapper">
          <div className="settings-container">
            {/* Rounds Selection */}
            <div className="option-group">
              <p>Rounds:</p>
              {roundsOptions.map((round) => (
                <button
                  key={round}
                  onClick={() => handleRoundSelection(round)}
                  className={`button ${
                    selectedRounds === round ? "selected" : ""
                  }`}
                >
                  {round}
                </button>
              ))}
            </div>

            {/* Chances Selection */}
            <div className="option-group">
              <p>Chances:</p>
              {chancesOptions.map((chance) => (
                <button
                  key={chance}
                  onClick={() => handleChanceSelection(chance)}
                  className={`button ${
                    selectedChances === chance ? "selected" : ""
                  }`}
                >
                  {chance}
                </button>
              ))}
            </div>

            {/* Start Game Button */}
            <button
              onClick={handleStartGame}
              className="start-button"
              disabled={!(selectedRounds && selectedChances)}
            >
              Start Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Selectoptions;
