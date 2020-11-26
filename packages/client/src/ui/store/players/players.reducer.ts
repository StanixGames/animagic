import {
  PlayersReducerType,
  PlayersState,
  PlayersActionType,
  PlayersActions,
} from './players.types';

const initState: PlayersState = {
  players: [],
};

export const playersReducer: PlayersReducerType = (state = initState, action: PlayersActionType) => {
  switch (action.type) {
    case PlayersActions.PLAYERS_SET: {
      const players = action.payload as Array<string>;
      return {
        ...state,
        players,
      };
    }
    default:
      return state;
  }
};