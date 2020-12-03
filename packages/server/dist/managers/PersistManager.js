"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersistManager = void 0;
const fs_1 = __importDefault(require("fs"));
const Game_1 = require("../Game");
const models_1 = require("../models");
const Manager_1 = require("./Manager");
class PersistManager extends Manager_1.Manager {
    constructor() {
        super();
        this.loadLocationState = (stateId) => {
            return new Promise((resolve, reject) => {
                const path = `${__dirname}/../../${stateId}.data`;
                fs_1.default.readFile(path, 'utf8', (err, data) => {
                    if (err) {
                        return reject(err);
                    }
                    try {
                        const persistState = JSON.parse(data);
                        return resolve(persistState);
                    }
                    catch (err) {
                        const bounds = new models_1.AABB(5, 5, 12, 18);
                        const initPersistState = Game_1.game.generatorManager.generateWorld(bounds);
                        return resolve(initPersistState);
                    }
                });
            });
        };
        this.saveLocationState = (state) => {
            return new Promise((resolve, reject) => {
                if (!state) {
                    return reject();
                }
                const { bounds, tiles, entities } = state;
                const tilesArr = new Array();
                const entitiesArr = new Array();
                tiles.forEach(tile => {
                    tilesArr.push(tile);
                });
                entities.forEach(entity => {
                    entitiesArr.push(entity);
                });
                const locationState = {
                    bounds,
                    tiles,
                    entities: entitiesArr,
                };
                const data = JSON.stringify(locationState);
                const path = `${__dirname}/../../${state.id}.data`;
                fs_1.default.writeFile(path, data, 'utf8', (err) => {
                    if (err) {
                        reject();
                    }
                    else {
                        resolve();
                    }
                });
            });
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
exports.PersistManager = PersistManager;
//# sourceMappingURL=PersistManager.js.map