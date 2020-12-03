import { Manager } from './Manager';

import { AABB, Tile } from '../models';
import { LocationPersistState } from '../locations/LocationState';

const getRandomTileId = () => {
  const min = 0;
  const max = 2;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export class GeneratorManager extends Manager {
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

  public generateWorld = (bounds: AABB): LocationPersistState => {
    const tiles = new Array<Tile>();

    for (let x = bounds.minX; x < bounds.maxX; x += 1) {
      for (let y = bounds.minY; y < bounds.maxY; y += 1) {

        const tile = new Tile(getRandomTileId(), x, y);
        tiles.push(tile);
      }
    }

    const state: LocationPersistState = {
      bounds,
      tiles,
      entities: [],
    };

    return state;
  }
}
