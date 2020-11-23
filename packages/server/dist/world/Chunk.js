"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chunk = void 0;
const Block_1 = require("./Block");
const SIZE = 8;
const BLOCKS_SIZE = SIZE * SIZE;
class Chunk {
    constructor(x, y) {
        this.generate = () => {
            for (let i = 0; i < this.blocks.length; i += 1) {
                const x = i % SIZE;
                const y = Math.floor(i / SIZE);
                const material = Math.random() > 0.3 ? 'dirt' : 'sand';
                this.blocks[i] = new Block_1.Block(x, y, material);
            }
            console.log('generated a chunk at ', this.x, this.y);
        };
        this.x = x;
        this.y = y;
        this.blocks = new Array(BLOCKS_SIZE);
    }
}
exports.Chunk = Chunk;
//# sourceMappingURL=Chunk.js.map