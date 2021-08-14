import React, { useMemo } from "react";
import PropTypes from "prop-types";
import RockPaperScissors from "../logic/rps";
import { ScoreTally } from "./ScoreTally";

const GameScreen = ({ username, onReset }) => {
  const game = useMemo(() => new RockPaperScissors(username), [username]);
  const [userSelection, setUserSelection] = React.useState(`rock`);
  const [userScore, setUserScore] = React.useState(0);
  const [CPUScore, setCPUScore] = React.useState(0);
  const [tieScore, setTieScore] = React.useState(0);

  const handleRPSOptionSelection = (event) => {
    setUserSelection(event.target.value);
  }

  const handleGoButton = () => {
    game.play(userSelection);
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
          <label htmlFor="user-selection">Select your choice: </label>
          <select
            className="custom-select"
            id="user-selection"
            name="user-selection"
            value={userSelection}
            onChange={handleRPSOptionSelection}
          >
            <option id="rock" value="rock">Rock</option>
            <option id="paper" value="paper">Paper</option>
            <option id="scissors" value="scissors">Scissors</option>
          </select>
        </div>
        <button className="btn btn-success" type="button" id="go-button" onClick={handleGoButton}>
          Go!
        </button>
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
