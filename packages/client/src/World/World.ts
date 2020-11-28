import { v4 } from 'uuid';

import { Chunk } from './Chunk';
import { Block } from './Block';
import { Entity } from './Entity';

// const generate = (chunk: Chunk) => {
//   for (let i = 0; i < chunk.blocks.length; i += 1) {
//     const x = i % Chunk.SIZE;
//     const y = Math.floor(i / Chunk.SIZE);
//     const material = Math.random() > 0.3 ? 'dirt' : 'sand';

//     chunk.blocks[i] = new Block(x, y, material);
//   }
// }

export class World {
  readonly chunks: Array<Array<Chunk>>;
  readonly entities: Map<string, Entity>;

  constructor() {
    this.entities = new Map<string, Entity>();
    this.chunks = new Array(0);
    this.chunks[0] = new Array(0);
  }

  addEntity = (entity: Entity) => {
    if (this.entities.has(entity.id)) {
      throw new Error('ENTITY CONFLICT ID');
    }

    this.entities.set(entity.id, entity);
  }

  update = (delta: number) => {
    // console.log('update world');
  }

  destroy = () => {
    //
  }
}