"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.World = void 0;
const shared_1 = require("@animagic/shared");
const generate = (chunk) => {
    for (let i = 0; i < chunk.blocks.length; i += 1) {
        const x = i % shared_1.Chunk.SIZE;
        const y = Math.floor(i / shared_1.Chunk.SIZE);
        const material = Math.random() > 0.3 ? 'dirt' : 'sand';
        chunk.blocks[i] = new shared_1.Block(x, y, material);
    }
    console.log('generated a chunk at ', chunk.x, chunk.y);
};
class World {
    constructor() {
        this.generate = () => {
            this.chunks = new Array(10);
            for (let x = 0; x < 10; x += 1) {
                this.chunks[x] = new Array(5);
                for (let y = 0; y < 5; y += 1) {
                    const chunk = new shared_1.Chunk(x, y);
                    generate(chunk);
                    this.chunks[x][y] = chunk;
                }
            }
            console.log('generated world');
        };
        this.update = (delta) => {
            // console.log('update world');
        };
        this.generate();
    }
}
exports.World = World;
//# sourceMappingURL=World.js.map