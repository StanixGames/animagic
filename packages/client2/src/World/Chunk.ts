import { WorldTile } from './WorldTile';

export const CHUNK_SIZE = 8;

export class Chunk {
  public x: number;
  public y: number;
  private tiles: Array<WorldTile>;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.tiles = new Array(CHUNK_SIZE * CHUNK_SIZE);
  }

  generate = () => {
    for (let i = 0; i < this.tiles.length; i += 1) {
      const x = i % CHUNK_SIZE;
      const y = Math.floor(i / CHUNK_SIZE);
      const material = Math.random() > 0.3 ? 'grass' : 'sand';

      this.tiles[i] = new WorldTile(x, y, material);
    }

    console.log('generated a chunk at ', this.x, this.y);
  }

  public getTiles = (): Array<WorldTile> => {
    return this.tiles;
  }
}