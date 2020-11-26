import * as React from 'react';

import './PlayersWidget.css';
import { usePlayers } from './usePlayers';

export const PlayersWidget: React.FC<{}> = () => {
  const players = usePlayers();

  return (
    <div className="PlayersWidget-wrapper">
      <div className="PlayersWidget-title">Players online:</div>
      <ul className="PlayersWidget-list">
        {players.map((player) => {
          return (
            <li className="PlayersWidget-listItem">{player}</li>
          );
        })}
      </ul>
    </div>
  );
};
