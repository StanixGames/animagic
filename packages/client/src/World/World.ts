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
  readonly chunks: Map<string, Chunk>;
  readonly entities: Map<string, Entity>;

  constructor() {
    this.entities = new Map<string, Entity>();
    this.chunks = new Map<string, Chunk>();
  }

  addEntity = (entity: Entity) => {
    if (this.entities.has(entity.id)) {
      throw new Error('ENTITY CONFLICT ID');
    }

    this.entities.set(entity.id, entity);
  }

  patchEntities = (entities: Array<Entity>) => {
    entities.forEach((entity) => {
      this.entities.set(entity.id, entity);
    });
  }

  patchChunk = (chunk: Chunk) => {
    const key = `${chunk.x}.${chunk.y}`;
    this.chunks.set(key, chunk);
  }

  update = (delta: number) => {
    // console.log('update world');
  }

  destroy = () => {
    this.entities.clear();
    this.chunks.clear();
  }
}