import { Manager } from './Manager';
import { config } from '../config';

import { LocationState } from '../locations/LocationState';
import { Entity, Player } from '../models';
import { Vector } from '../utils';

export class WorldManager extends Manager {
  public locationsState: Map<string, LocationState>;
  public players: Map<string, Player>;

  constructor() {
    super();
    this.locationsState = new Map<string, LocationState>();
    this.players = new Map<string, Player>();
  }

  init(): Promise<void> {
    return Promise.resolve();
  }

  destroy(): Promise<void> {
    return Promise.resolve();
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
