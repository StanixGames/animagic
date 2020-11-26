import { Chunk } from './Chunk';
import { Block } from './Block';

const generate = (chunk: Chunk) => {
  for (let i = 0; i < chunk.blocks.length; i += 1) {
    const x = i % Chunk.SIZE;
    const y = Math.floor(i / Chunk.SIZE);
    const material = Math.random() > 0.3 ? 'dirt' : 'sand';

    chunk.blocks[i] = new Block(x, y, material);
  }
}

export class World {
  public chunks: Array<Array<Chunk>>;

  constructor() {
    this.generate();
  }

  generate = () => {
    console.log('generating world...');

    this.chunks = new Array(10);

    for (let x = 0; x < 10; x += 1) {
      this.chunks[x] = new Array(5);

      for (let y = 0; y < 5; y += 1) {
        const chunk = new Chunk(x, y);
        generate(chunk);
        this.chunks[x][y] = chunk;
      }
    }

    console.log('generated world', this.chunks.length, 'x', this.chunks[0].length, 'chunks');
    console.log('generated world', this.chunks.length * 8, 'x', this.chunks[0].length * 8, 'blocks');
  }

  update = (delta: number) => {
    // console.log('update world');
  }

  destroy = () => {
    //
  }
}