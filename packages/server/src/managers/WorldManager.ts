import { Manager } from './Manager';
import { game } from '../Game';

import { LocationState } from '../locations/LocationState';
import { WorldState } from '../world';
import { Player } from '../models';

export class WorldManager extends Manager {
  public world: WorldState | undefined;
  public locationsState: Map<string, LocationState>;
  public players: Map<string, Player>;

  constructor() {
    super();
    this.locationsState = new Map<string, LocationState>();
    this.players = new Map<string, Player>();
    this.world = undefined;
  }

  init(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const persistState = await game.persistManager.loadWorldState();

        const players = new Map<string, Player>();

        persistState.players.forEach((player) => {
          players.set(player.id, player);
        });

        this.world = {
          players,
        };

        console.log('Load the world state');
        return resolve();
      } catch (error) {
        console.log('Cannot load the world state');
        return reject(error);
      }
    });
  }

  destroy(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        await game.persistManager.saveWorldState(this.world);
        console.log('Saved the world state');
        return resolve();
      } catch (error) {
        console.log('Cannot save the world state');
        return reject(error);
      }
    });
  }

  public createPlayer = (id: string) => {

  }

  public addState = (id: string, state: LocationState) => {
    this.locationsState.set(id, state);
    console.log('add new state', id);
  }

  public removeState = (id: string) => {
    this.locationsState.delete(id);
    console.log('remove new state', id);
  }

  update(delta: number): void {
    this.locationsState.forEach((state) => {
      state.entities.forEach((entity) => {
        if (entity.velX === 0 && entity.velY === 0) {
          return;
        }

        if (entity.velX !== 0) {
          entity.x += entity.velX * delta;
        }
        if (entity.velY !== 0) {
          entity.y += entity.velY * delta;
        }
      });
    });
  }
}
