import * as React from 'react';
import * as Redux from 'react-redux';

import { UIState } from '../store';
import { PlayersState } from '../store/players';

export const usePlayers = () => {
  const players = Redux.useSelector<UIState, PlayersState>((state) => state.players);

  return players.players;
};
