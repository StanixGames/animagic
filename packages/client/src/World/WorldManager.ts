import { Manager, Vector } from '../types';
import { Game } from '../Game';

import { Entity } from './Entity';
import { World } from './World';
import { Chunk } from './Chunk';
// import { WorldTile } from './WorldTile';

export class WorldManager extends Manager {
  readonly world: World;
  private scaling = 20;
  private playerEntityId: string | null;
  private playerPrevChunkPosition: Vector;

  constructor(game: Game) {
    super(game);
    this.world = new World();
    this.playerEntityId = null;
    this.playerPrevChunkPosition = {
      x: 0,
      y: 0,
    };
  }

  init(): Promise<void> {
    return Promise.resolve();
  }

  destroy(): Promise<void> {
    this.world.destroy();
    
    return Promise.resolve();
  }

  update = (delta: number) => {
    if (!this.playerEntityId) {
      return;
    }
    const playerEntity = this.world.entities.get(this.playerEntityId);

    if (!playerEntity) {
      return;
    }

    const chunkX = playerEntity.position.x / 8;
    const chunkY = playerEntity.position.y / 8;

    if (this.playerPrevChunkPosition.x !== chunkX || this.playerPrevChunkPosition.y !== chunkY) {
      console.log('GET NEW CHUNKS');

      this.playerPrevChunkPosition.x = chunkX;
      this.playerPrevChunkPosition.y = chunkY;
    }
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

  public getPlayerEntity = (): Entity | undefined => {
    if (!this.playerEntityId) {
      return undefined;
    }

    return this.world.entities.get(this.playerEntityId);
  }

  public getChunkAt = (x: number, y: number): Chunk | undefined => {
    return this.world.chunks.get(`${x}.${y}`);
  };

  public addPlayer = (entity: Entity) => {
    this.playerEntityId = entity.id;
    this.world.addEntity(entity);
  }

  public patchWorld = (entities: Array<Entity>) => {
    this.world.patchEntities(entities);
  }

  public patchChunk = (chunk: Chunk) => {
    this.world.patchChunk(chunk);
  }
}