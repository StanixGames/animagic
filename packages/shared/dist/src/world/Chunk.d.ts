import { Block } from './Block';
export declare class Chunk {
    static SIZE: number;
    static BLOCKS_SIZE: number;
    x: number;
    y: number;
    blocks: Array<Block>;
    constructor(x: number, y: number);
}
