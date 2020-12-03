import fs from 'fs';

import { game } from '../Game';
import { AABB, Entity, Tile, Player } from '../models';
import { LocationState, LocationPersistState } from '../locations/LocationState';
import { WorldState, WorldPersistState } from '../world';

import { Manager } from './Manager';

export class PersistManager extends Manager {
  constructor() {
    super();
  }

  init(): Promise<void> {
    return Promise.resolve();
  }

  destroy(): Promise<void> {
    return Promise.resolve();
  }

  update(delta: number): void {}

  public loadWorldState = (): Promise<WorldPersistState> => {
    return new Promise((resolve, reject) => {
      const path = `${__dirname}/../../data/world.data`;
      
      fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
          return reject(err);
        }

        try {
          const persistState = JSON.parse(data) as any as WorldPersistState;
          
          return resolve(persistState);
        } catch (err) {
          const initPersistState = game.generatorManager.generateWorld();
          return resolve(initPersistState);
        }
      });
    });
  };

  public saveWorldState = (state: WorldState): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!state) {
        return reject();
      }

      const players = new Array<Player>();

      for (let player of state.players.values()) {
        players.push(player);
      }

      const persistState: WorldPersistState = {
        players,
      };

      const data = JSON.stringify(persistState);
      const path = `${__dirname}/../../data/world.data`;

      fs.writeFile(path, data, 'utf8', (err) => {
        if (err) {
          reject();
        } else {
          resolve();
        }
      });
    });
  };

  public loadLocationState = (stateId: string): Promise<LocationPersistState> => {
    return new Promise((resolve, reject) => {
      const path = `${__dirname}/../../data/${stateId}.data`;
      
      fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
          return reject(err);
        }

        try {
          const persistState = JSON.parse(data) as any as LocationPersistState;
          
          return resolve(persistState);
        } catch (err) {
          const bounds = new AABB(5, 5, 12, 18);
          const initPersistState = game.generatorManager.generateGrindir(bounds);
          return resolve(initPersistState);
        }
      });
    });
  };

  public saveLocationState = (state: LocationState): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!state) {
        return reject();
      }
      
      const { bounds, tiles, entities } = state;
      const tilesArr = new Array<Tile>();
      const entitiesArr = new Array<Entity>();
      
      tiles.forEach(tile => {
        tilesArr.push(tile);
      });
      entities.forEach(entity => {
        entitiesArr.push(entity);
      });
  
      const locationState: LocationPersistState = {
        bounds,
        tiles,
        entities: entitiesArr,
      }
  
      const data = JSON.stringify(locationState);
      const path = `${__dirname}/../../data/${state.id}.data`;

      fs.writeFile(path, data, 'utf8', (err) => {
        if (err) {
          reject();
        } else {
          resolve();
        }
      });
    });
  };
}
