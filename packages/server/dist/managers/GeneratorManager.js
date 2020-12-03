"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneratorManager = void 0;
const Manager_1 = require("./Manager");
const models_1 = require("../models");
const getRandomTileId = () => {
    const min = 0;
    const max = 2;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
class GeneratorManager extends Manager_1.Manager {
    constructor() {
        super();
        this.generateWorld = (bounds) => {
            const tiles = new Array();
            for (let x = bounds.minX; x < bounds.maxX; x += 1) {
                for (let y = bounds.minY; y < bounds.maxY; y += 1) {
                    const tile = new models_1.Tile(getRandomTileId(), x, y);
                    tiles.push(tile);
                }
            }
            const state = {
                bounds,
                tiles,
                entities: [],
            };
            return state;
        };
    }
    init() {
        return Promise.resolve();
    }
    destroy() {
        return Promise.resolve();
    }
    update(delta) { }
}
exports.GeneratorManager = GeneratorManager;
//# sourceMappingURL=GeneratorManager.js.map