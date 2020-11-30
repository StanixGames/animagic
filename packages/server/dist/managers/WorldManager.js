"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldManager = void 0;
const Manager_1 = require("./Manager");
const config_1 = require("../config");
const world_1 = require("../world");
class WorldManager extends Manager_1.Manager {
    constructor() {
        super();
        this.getPlayerEntity = (login) => {
            const playableEntity = this.world.playableEntities.get(login);
            if (!playableEntity) {
                return null;
            }
            const entity = this.world.entities.get(playableEntity.id);
            return entity;
        };
        this.getEntitiesAsArray = () => {
            const entities = [];
            for (let entity of this.world.entities.values()) {
                entities.push(entity);
            }
            return entities;
        };
        this.getChunkAt = (x, y) => {
            const chunk = this.world.chunks.get(x, y);
            return chunk;
        };
        this.getChunksInRadius = (x, y) => {
            const chunks = [];
            const leftX = x - config_1.config.PLAYER_CHUNKS_RADIUS / 2;
            const leftY = y - config_1.config.PLAYER_CHUNKS_RADIUS / 2;
            const rightX = x + config_1.config.PLAYER_CHUNKS_RADIUS / 2;
            const rightY = y + config_1.config.PLAYER_CHUNKS_RADIUS / 2;
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
        };
        this.moveEntity = (entityId, velocity) => {
            this.world.moveEntity(entityId, velocity);
        };
        this.world = new world_1.World();
    }
    init() {
        console.log('generating world...');
        for (let x = -10; x < 10; x += 1) {
            for (let y = -10; y < 10; y += 1) {
                this.world.generateChunk(x, y);
            }
        }
        this.world.generateEntities();
        return Promise.resolve();
    }
    destroy() {
        return Promise.resolve();
    }
    update(delta) {
        this.world.update(delta);
        // const chunkX = playerEntity.position.x / 8;
        // const chunkY = playerEntity.position.y / 8;
        // if (this.playerPrevChunkPosition.x !== chunkX || this.playerPrevChunkPosition.y !== chunkY) {
        //   console.log('GET NEW CHUNKS');
        //   this.playerPrevChunkPosition.x = chunkX;
        //   this.playerPrevChunkPosition.y = chunkY;
        // }
    }
}
exports.WorldManager = WorldManager;
//# sourceMappingURL=WorldManager.js.map