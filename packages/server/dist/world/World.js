"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.World = void 0;
const Chunk_1 = require("./Chunk");
const Block_1 = require("./Block");
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
    }
}
exports.World = World;
//# sourceMappingURL=World.js.map