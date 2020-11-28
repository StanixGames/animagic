import { Reducer, Action } from 'redux';

export interface PlayersState {
  players: Array<string>;
}

export enum PlayersActions {
  PLAYERS_SET = 'PLAYERS_SET',
}

export interface PlayersActionType extends Action {
  type: PlayersActions;
  payload: Array<string>;
}

export type PlayersReducerType = Reducer<PlayersState, PlayersActionType>;