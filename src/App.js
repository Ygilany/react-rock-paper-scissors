import React, { useState } from 'react';
import './App.css';
import GameScreen from './components/GameScreen2';
import WelcomeScreen from './components/WelcomeScreen';

const App = ()=>{
  const [username, setUsername] = useState('');
  const [gameStart, setGameStart] = useState(false);

  const onPlayButtonClick = () => {
    setGameStart(true);
  };

  const onGameReset = () => {
    setGameStart(false);
  };

  return (
    <>
      <h1>Rock Paper Scissors</h1>
      <div className="container">
        <div className="row">
          {
            !gameStart 
            ? <WelcomeScreen username={username} setUsername={setUsername} onPlay={onPlayButtonClick}/>
            : <GameScreen username={username} onReset={onGameReset}/>
          }
        </div>
      </div>
    </>
)};

export default App;
