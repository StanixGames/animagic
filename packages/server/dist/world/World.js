"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.World = void 0;
const uuid_1 = require("uuid");
const Chunk_1 = require("./Chunk");
const Block_1 = require("./Block");
const Entity_1 = require("./Entity");
const PlayableEntity_1 = require("./PlayableEntity");
const generate = (chunk) => {
    for (let i = 0; i < chunk.blocks.length; i += 1) {
        const x = i % Chunk_1.Chunk.SIZE;
        const y = Math.floor(i / Chunk_1.Chunk.SIZE);
        const material = Math.random() > 0.3 ? 'dirt' : 'sand';
        chunk.blocks[i] = new Block_1.Block(x, y, material);
    }
};
class World {
    constructor() {
        this.generate = () => {
            console.log('generating world...');
            this.chunks = new Array(10);
            for (let x = 0; x < 10; x += 1) {
                this.chunks[x] = new Array(5);
                for (let y = 0; y < 5; y += 1) {
                    const chunk = new Chunk_1.Chunk(x, y);
                    generate(chunk);
                    this.chunks[x][y] = chunk;
                }
            }
            console.log('generated world', this.chunks.length, 'x', this.chunks[0].length, 'chunks');
            console.log('generated world', this.chunks.length * 8, 'x', this.chunks[0].length * 8, 'blocks');
        };
        this.update = (delta) => {
            // console.log('update world');
        };
        this.destroy = () => {
            //
        };
        this.generate();
        this.playableEntities = new Map();
        this.entities = new Map();
        const bobEntity = new Entity_1.Entity(uuid_1.v4(), 'player', { x: 0, y: 0 }, { x: 10, y: 3 }, { x: 0, y: 0 }, 0x66b324);
        const bobPlayableEntity = new PlayableEntity_1.PlayableEntity(bobEntity.id, 'bob');
        this.entities.set(bobEntity.id, bobEntity);
        this.playableEntities.set('bob', bobPlayableEntity);
    }
}
exports.World = World;
//# sourceMappingURL=World.js.map