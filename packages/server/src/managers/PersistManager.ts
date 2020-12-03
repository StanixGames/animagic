import fs from 'fs';

import { game } from '../Game';
import { AABB, Entity, Tile } from '../models';
import { LocationState, LocationPersistState } from '../locations/LocationState';

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

  public loadLocationState = (stateId: string): Promise<LocationPersistState> => {
    return new Promise((resolve, reject) => {
      const path = `${__dirname}/../../${stateId}.data`;
      
      fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
          return reject(err);
        }

        try {
          const persistState = JSON.parse(data) as any as LocationPersistState;
          
          return resolve(persistState);
        } catch (err) {
          const bounds = new AABB(5, 5, 12, 18);
          const initPersistState = game.generatorManager.generateWorld(bounds);
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
      const path = `${__dirname}/../../${state.id}.data`;

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
