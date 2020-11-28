import { PlayersState } from './players';
import { UserState } from './user';

export interface UIState {
  players: PlayersState;
  user: UserState;
}
