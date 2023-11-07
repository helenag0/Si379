import './ColorPicker.css';
import Slider from './Slider';
import React from "react";

const MIN = 0;
const MAX = 255;

function ColorPicker() {
  const [redGuess, setRedGuess]     = React.useState(getRandomIntegerBetween(MIN, MAX));
  const [greenGuess, setGreenGuess] = React.useState(getRandomIntegerBetween(MIN, MAX));
  const [blueGuess, setBlueGuess]   = React.useState(getRandomIntegerBetween(MIN, MAX));

  const [blue, setBlue]   = React.useState(getRandomIntegerBetween(MIN, MAX));
  const [red, setRed]   = React.useState(getRandomIntegerBetween(MIN, MAX));
  const [green, setGreen]   = React.useState(getRandomIntegerBetween(MIN, MAX));

  const [cheatingMode, setCheatingMode] = React.useState(false);
  const [showResult, setShowResult] = React.useState(false);
  const [showNextButton, setShowNextButton] = React.useState(false);

  const toggleCheatBox = () => {
    setCheatingMode(!cheatingMode);
  };

  const calculateResult = () => {
    setShowResult(true);
    setShowNextButton(true);
  };

  const resetGame = () => {
    setRed(getRandomIntegerBetween(MIN, MAX));
    setGreen(getRandomIntegerBetween(MIN, MAX));
    setBlue(getRandomIntegerBetween(MIN, MAX));
    
    setRedGuess(getRandomIntegerBetween(MIN, MAX));
    setGreenGuess(getRandomIntegerBetween(MIN, MAX));
    setBlueGuess(getRandomIntegerBetween(MIN, MAX));
  
    setShowResult(false);
    setShowNextButton(false);
  };


  return (
    <div className="App">

    <label id="cheating-mode">Cheating mode
      <input type="checkbox" onChange={toggleCheatBox} checked={cheatingMode} />
    </label>

      {/* initial color (static) */}
      <div id="initial-color" style={{backgroundColor: `rgb(${redGuess}, ${greenGuess}, ${blueGuess})`}} />

      {/* user-submitted guess (cheating mode) */}
      <div className={`cheat-box ${cheatingMode ? 'show' : 'hide'}`} id="color-preview" style={{backgroundColor: `rgb(${red}, ${green}, ${blue})`}} />

      <p>Guess the color of the rectangle</p>

      <div id="color-picker">
        <div className="row">
          <span className="component-color-preview" style={{backgroundColor: `rgb(255, 0, 0, ${red/MAX})`  }}>Red:</span>
          <Slider min={MIN} max={MAX} startingValue={red} onChange={r => setRed(r)} />
        </div>
        <div className="row">
          <span className="component-color-preview" style={{backgroundColor: `rgb(0, 255, 0, ${green/MAX})`}}>Green:</span>
          <Slider min={MIN} max={MAX} startingValue={green} onChange={g => setGreen(g)} />
        </div>
        <div className="row">
          <span className="component-color-preview" style={{backgroundColor: `rgb(0, 0, 255, ${blue/MAX})` }}>Blue:</span>
          <Slider min={MIN} max={MAX} startingValue={blue} onChange={b => setBlue(b)} />
        </div>
      </div>
      {showResult ? (
        <>
          <p>Your guess: rgb({red}, {green}, {blue}). Actual: <strong>rgb({redGuess}, {greenGuess}, {blueGuess})</strong></p>
          {showNextButton && <button onClick={resetGame}>Next</button>}
        </>
      ) : (
        <button onClick={calculateResult}>Guess</button>
      )}
    </div>
  );
}

export default App;

function getRandomIntegerBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


