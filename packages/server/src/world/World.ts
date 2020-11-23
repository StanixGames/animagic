import { Chunk, Block } from '@animagic/shared';

const generate = (chunk: Chunk) => {
  for (let i = 0; i < chunk.blocks.length; i += 1) {
    const x = i % Chunk.SIZE;
    const y = Math.floor(i / Chunk.SIZE);
    const material = Math.random() > 0.3 ? 'dirt' : 'sand';

    chunk.blocks[i] = new Block(x, y, material);
  }

  console.log('generated a chunk at ', chunk.x, chunk.y);
}

export class World {
  public chunks: Array<Array<Chunk>>;

  constructor() {
    this.generate();
  }

  generate = () => {
    this.chunks = new Array(10);

    for (let x = 0; x < 10; x += 1) {
      this.chunks[x] = new Array(5);

      for (let y = 0; y < 5; y += 1) {
        const chunk = new Chunk(x, y);
        generate(chunk);
        this.chunks[x][y] = chunk;
      }
    }

    console.log('generated world');
  }

  update = (delta: number) => {
    // console.log('update world');
  }
}