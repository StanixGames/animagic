import { Manager } from '../types';
import { Game } from '../Game';

import { Chunk } from './Chunk';
// import { WorldTile } from './WorldTile';

export class WorldManager extends Manager {
  private chunks: Map<string, Chunk>;
  private scaling = 1;

  constructor(game: Game) {
    super(game);
    this.chunks = new Map();
  }

  init(): void {
    for (let x = 0; x < 20; x += 1) {
      for (let y = 0; y < 20; y += 1) {
        const chunk = new Chunk(x, y);
        chunk.generate();
        this.chunks.set(`${x}.${y}`, chunk);
      }
    }

    console.log('generated chunks');
  }

  destroy(): void {
    // todo
  }

  public updateScaling(scale: number) {
    this.scaling += scale;
    if (this.scaling < 0.5) {
      this.scaling = 0.5;
    } else if (this.scaling > 3) {
      this.scaling = 4;
    }
  }

  public getScaling = (): number => {
    return this.scaling;
  }

  public getChunkAt = (x: number, y: number): Chunk | undefined => {
    return this.chunks.get(`${x}.${y}`);
  };
}