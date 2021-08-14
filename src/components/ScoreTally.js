import React from "react";
import PropTypes from "prop-types";

export const ScoreTally = ({ username, userScore, CPUScore, tieScore }) => {
  return (
    <div id="score-tally" data-testid="score-tally">
      <p id="score">
        {`${username}: ${userScore} v CPU: ${CPUScore} - Tie: ${tieScore}`}
      </p>
    </div>
  );
};
ScoreTally.propTypes = {
  username: PropTypes.string.isRequired,
  userScore: PropTypes.number.isRequired,
  CPUScore: PropTypes.number.isRequired,
  tieScore: PropTypes.number.isRequired,
};
