
export const calculateFinalScore = (roundsLeft, chancesLeft, stopwatchTime) => {
    console.log("round left" ,roundsLeft);
    console.log("cahnse left ",chancesLeft);
  const baseScore = 1000;
  const roundBonus = roundsLeft * 100;
  const chanceBonus = chancesLeft * 50;
  const timePenalty = Math.floor(stopwatchTime / 2);

  return Math.max(baseScore + roundBonus + chanceBonus - timePenalty, 0);
};
