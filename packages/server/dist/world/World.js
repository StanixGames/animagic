"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.World = void 0;
const uuid_1 = require("uuid");
const utils_1 = require("../utils");
const Chunk_1 = require("./Chunk");
const Block_1 = require("./Block");
const Entity_1 = require("./Entity");
const PlayableEntity_1 = require("./PlayableEntity");
const generateChunkBlocks = (chunk) => {
    for (let i = 0; i < chunk.blocks.length; i += 1) {
        const x = i % Chunk_1.Chunk.SIZE;
        const y = Math.floor(i / Chunk_1.Chunk.SIZE);
        const material = Math.random() > 0.3 ? 'dirt' : 'sand';
        chunk.blocks[i] = new Block_1.Block(x, y, material);
    }
};
class World {
    constructor() {
        this.generateChunk = (x, y) => {
            console.log('generating chunk at ', x, y);
            const chunk = new Chunk_1.Chunk(x, y);
            generateChunkBlocks(chunk);
            this.chunks.set(x, y, chunk);
            return chunk;
        };
        this.generateEntities = () => {
            // Test player
            const bobEntity = new Entity_1.Entity(uuid_1.v4(), 'player', { x: 0, y: 0 }, { x: 1, y: 1.8 }, { x: 0, y: 0 }, 0xcf0c3a);
            const bobPlayableEntity = new PlayableEntity_1.PlayableEntity(bobEntity.id, 'bob');
            this.entities.set(bobEntity.id, bobEntity);
            this.playableEntities.set('bob', bobPlayableEntity);
            const mikeEntity = new Entity_1.Entity(uuid_1.v4(), 'player', { x: 56, y: 112 }, { x: 1, y: 1.8 }, { x: 0, y: 0 }, 0xae0ccf);
            const mikePlayableEntity = new PlayableEntity_1.PlayableEntity(mikeEntity.id, 'mike');
            this.entities.set(mikeEntity.id, mikeEntity);
            this.playableEntities.set('mike', mikePlayableEntity);
            // Entities
            for (let i = 0; i < 20; i += 1) {
                const treeEntity = new Entity_1.Entity(uuid_1.v4(), 'plant', { x: Math.random() * 50 - 25, y: Math.random() * 50 - 25 }, { x: 2 + Math.random() * -0.5, y: 5 + Math.random() * -0.2 }, { x: 0, y: 0 }, 0x4dc20e);
                this.entities.set(treeEntity.id, treeEntity);
            }
        };
        this.moveEntity = (entityId, velocity) => {
            const entity = this.entities.get(entityId);
            if (!entity) {
                return;
            }
            entity.velocity.x = velocity.x;
            entity.velocity.y = velocity.y;
        };
        this.update = (delta) => {
            this.entities.forEach((entity) => {
                if (entity.velocity.x !== 0) {
                    entity.position.x += entity.velocity.x;
                }
                if (entity.velocity.y !== 0) {
                    entity.position.y += entity.velocity.y;
                }
            });
        };
        this.destroy = () => {
            this.entities.clear();
            this.playableEntities.clear();
            this.chunks.clear();
        };
        this.playableEntities = new Map();
        this.entities = new Map();
        this.chunks = new utils_1.Array2D();
    }
}
exports.World = World;
//# sourceMappingURL=World.js.map