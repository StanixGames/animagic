import { PlayersActionType, PlayersActions, PlayersState } from './players.types';

export const setPlayers = (payload: Array<string>): PlayersActionType => ({
  type: PlayersActions.PLAYERS_SET,
  payload,
});
