import { Manager } from '../types';
import { Game } from '../Game';

import { Entity } from './Entity';
import { World } from './World';
// import { WorldTile } from './WorldTile';

export class WorldManager extends Manager {
  readonly world: World;
  private scaling = 20;

  constructor(game: Game) {
    super(game);
    this.world = new World();
  }

  init(): Promise<void> {
    return Promise.resolve();
  }

  destroy(): Promise<void> {
    return Promise.resolve();
  }

  public toWorldDistance = (distance: number) => {
    return distance / this.scaling;
  }

  public updateScaling(scale: number) {
    this.scaling += scale;
    if (this.scaling < 10) {
      this.scaling = 10;
    } else if (this.scaling > 50) {
      this.scaling = 50;
    }
  }

  public getScaling = (): number => {
    return this.scaling;
  }

  // public getChunkAt = (x: number, y: number): Chunk | undefined => {
  //   return undefined;
  //   // return this.chunks.get(`${x}.${y}`);
  // };

  public addPlayer = (entity: Entity) => {
    this.world.addEntity(entity)
  }
}