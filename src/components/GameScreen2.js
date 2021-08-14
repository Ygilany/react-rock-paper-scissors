import React, { useMemo } from "react";
import PropTypes from "prop-types";
import RockPaperScissors from "../logic/rps";
import { ScoreTally } from "./ScoreTally";

const GameScreen = ({ username, onReset }) => {
  const game = useMemo(() => new RockPaperScissors(username), [username]);
  const [userScore, setUserScore] = React.useState(0);
  const [CPUScore, setCPUScore] = React.useState(0);
  const [tieScore, setTieScore] = React.useState(0);

  const handleRPSOptionSelection = (value) => {
    game.play(value);
    setUserScore(game.getScore().user);
    setCPUScore(game.getScore().cpu);
    setTieScore(game.getScore().tie);
  }

  const handleResetGame = () => {
    onReset();
  }

  return (
    <div id="game-screen" data-testid="game-screen">
      Welcome to the game, {username}
        <ScoreTally username={username} userScore={userScore} CPUScore={CPUScore} tieScore={tieScore} />
      <form id="game-form">
        <div className="form-group">
          <button type="button" onClick={()=>handleRPSOptionSelection('rock')}>Rock</button>
          <button type="button" onClick={()=>handleRPSOptionSelection('paper')}>Paper</button>
          <button type="button" onClick={()=>handleRPSOptionSelection('scissors')}>Scissors</button>
        </div>
      </form>
      <p id="game-history"></p>
      <button id="reset-game-button" className="btn btn-secondary" onClick={handleResetGame}>
        Reset Game
      </button>
    </div>
  );
};

GameScreen.propTypes = {
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired
};

export default GameScreen;
