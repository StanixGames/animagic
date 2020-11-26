"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chunk = void 0;
class Chunk {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.blocks = new Array(Chunk.BLOCKS_SIZE);
    }
}
exports.Chunk = Chunk;
Chunk.SIZE = 8;
Chunk.BLOCKS_SIZE = 64;
//# sourceMappingURL=Chunk.js.map