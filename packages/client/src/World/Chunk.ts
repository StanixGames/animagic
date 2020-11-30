import { Block } from './Block';

export class Chunk {
  public static SIZE = 8;
  public static BLOCKS_SIZE = 64;

  public x: number;
  public y: number;
  public blocks: Array<Block>;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.blocks = new Array(Chunk.BLOCKS_SIZE);
  }
}