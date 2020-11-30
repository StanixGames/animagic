import { v4 } from 'uuid';

import { Array2D, Vector } from '../utils';

import { Chunk } from './Chunk';
import { Block } from './Block';
import { Entity } from './Entity';
import { PlayableEntity } from './PlayableEntity';

const generateChunkBlocks = (chunk: Chunk) => {
  for (let i = 0; i < chunk.blocks.length; i += 1) {
    const x = i % Chunk.SIZE;
    const y = Math.floor(i / Chunk.SIZE);
    const material = Math.random() > 0.3 ? 'dirt' : 'sand';

    chunk.blocks[i] = new Block(x, y, material);
  }
}

export class World {
  public chunks: Array2D<Chunk>;
  public playableEntities: Map<string, PlayableEntity>;
  public entities: Map<string, Entity>;

  constructor() {
    this.playableEntities = new Map<string, PlayableEntity>();
    this.entities = new Map<string, Entity>();
    this.chunks = new Array2D<Chunk>();
  }

  public generateChunk = (x: number, y: number): Chunk => {
    console.log('generating chunk at ', x, y);

    const chunk = new Chunk(x, y);
    generateChunkBlocks(chunk);

    this.chunks.set(x, y, chunk);

    return chunk;
  }

  generateEntities = () => {
    // Test player
    const bobEntity = new Entity(
      v4(),
      'player',
      { x: 0, y: 0 },
      { x: 1, y: 1.8 },
      { x: 0, y: 0 },
      0xcf0c3a
    );
    const bobPlayableEntity = new PlayableEntity(bobEntity.id, 'bob');

    this.entities.set(bobEntity.id, bobEntity);
    this.playableEntities.set('bob', bobPlayableEntity);

    const mikeEntity = new Entity(
      v4(),
      'player',
      { x: 56, y: 112 },
      { x: 1, y: 1.8 },
      { x: 0, y: 0 },
      0xae0ccf
    );
    const mikePlayableEntity = new PlayableEntity(mikeEntity.id, 'mike');

    this.entities.set(mikeEntity.id, mikeEntity);
    this.playableEntities.set('mike', mikePlayableEntity);

    // Entities
    for (let i = 0; i < 20; i += 1) {
      const treeEntity = new Entity(
        v4(),
        'plant',
        { x: Math.random() * 50 - 25, y: Math.random() * 50 - 25 },
        { x: 2 + Math.random() * -0.5, y: 5 + Math.random() * -0.2 },
        { x: 0, y: 0 },
        0x4dc20e
      );
      this.entities.set(treeEntity.id, treeEntity);
    }
  }

  moveEntity = (entityId: string, velocity: Vector) => {
    const entity = this.entities.get(entityId);

    if (!entity) {
      return;
    }

    entity.velocity.x = velocity.x;
    entity.velocity.y = velocity.y;
  }

  update = (delta: number) => {
    this.entities.forEach((entity) => {
      if (entity.velocity.x !== 0) {
        entity.position.x += entity.velocity.x;
      }
      if (entity.velocity.y !== 0) {
        entity.position.y += entity.velocity.y;
      }
    });
  }

  destroy = () => {
    this.entities.clear();
    this.playableEntities.clear();
    this.chunks.clear();
  }
}