import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Game, Board} from './tictac';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Game></Game>
      </header>
    </div>
  );
}

export default App;
