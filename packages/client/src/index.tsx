import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './ui/screens/App';
// import { Game } from './Game';

// window.onload = () => {
//   const game = new Game();
//   // const scaleFactor= GAME_ELEMENT.clientHeight / game.;
// };

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app')
);
