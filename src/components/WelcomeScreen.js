import React from "react";
import PropTypes from "prop-types";

const WelcomeScreen = ({username, setUsername, onPlay}) => {

  const onPlayClick = (e) => {
    e.preventDefault();
    onPlay(username);
  };

  return (
    <div data-testid="welcome-screen" className="welcome-screen">
      <div className="welcome-screen-content">
        <p>
          Rock Paper Scissors is a game where you choose a weapon and your
          opponent chooses a weapon. You can win by choosing the weapon that
          beats the opponent's weapon.
        </p>
        <p>
          The computer will randomly choose a weapon for you and your opponent.
        </p>
        <p>You can choose to play again by clicking the button below.</p>
      </div>
      <form aria-label="user-name-form" onSubmit={onPlayClick}>
        <label htmlFor="user-name">Name</label>
        <input type="text" id="user-name" value={username} onChange={(e)=>{setUsername(e.target.value)} }/>
        <button className="button" type="submit">
          Play
        </button>
      </form>
    </div>
  );
};

WelcomeScreen.propTypes = {
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired
};

export default WelcomeScreen;
