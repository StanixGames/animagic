import { Manager } from './Manager';
import { config } from '../config';

import { Vector } from '../utils';
import { World, Entity, Chunk } from '../world';

export class WorldManager extends Manager {
  private world: World;

  constructor() {
    super();
    this.world = new World();
  }

  init(): Promise<void> {
    console.log('generating world...');

    for (let x = -10; x < 10; x += 1) {
      for (let y = -10; y < 10; y += 1) {
        this.world.generateChunk(x, y);
      }
    }

    this.world.generateEntities();

    return Promise.resolve();
  }

  destroy(): Promise<void> {
    return Promise.resolve();
  }

  update(delta: number): void {
    this.world.update(delta);

    // const chunkX = playerEntity.position.x / 8;
    // const chunkY = playerEntity.position.y / 8;

    // if (this.playerPrevChunkPosition.x !== chunkX || this.playerPrevChunkPosition.y !== chunkY) {
    //   console.log('GET NEW CHUNKS');

    //   this.playerPrevChunkPosition.x = chunkX;
    //   this.playerPrevChunkPosition.y = chunkY;
    // }
  }

  public getPlayerEntity = (login: string): Entity | null => {
    const playableEntity = this.world.playableEntities.get(login);

    if (!playableEntity) {
      return null;
    }

    const entity = this.world.entities.get(playableEntity.id);

    return entity;
  }

  public getEntitiesAsArray = (): Array<Entity> => {
    const entities: Array<Entity> = [];

    for (let entity of this.world.entities.values()) {
      entities.push(entity);
    }

    return entities;
  }

  public getChunkAt = (x: number, y: number): Chunk | undefined => {
    const chunk = this.world.chunks.get(x, y);
    return chunk;
  };

  public getChunksInRadius = (x: number, y: number): Array<Chunk> => {
    const chunks: Array<Chunk> = [];

    const leftX = x - config.PLAYER_CHUNKS_RADIUS / 2;
    const leftY = y - config.PLAYER_CHUNKS_RADIUS / 2;
    const rightX = x + config.PLAYER_CHUNKS_RADIUS / 2;
    const rightY = y + config.PLAYER_CHUNKS_RADIUS / 2;

    for (let x = leftX; x < rightX; x += 1) {
      for (let y = leftY; y < rightY; y += 1) {
        const chunk = this.world.chunks.get(x, y);

        if (!chunk) {
          const newChunk = this.world.generateChunk(x, y);
          chunks.push(newChunk);

          continue;
        }

        chunks.push(chunk);
      }
    }

    return chunks;
  }

  public moveEntity = (entityId: string, velocity: Vector) => {
    this.world.moveEntity(entityId, velocity);
  }
}