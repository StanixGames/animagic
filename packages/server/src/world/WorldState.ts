import { Player } from '../models';

export class WorldPersistState {
  players: Array<Player>;
}

export class WorldState {
  players: Map<string, Player>;
}
