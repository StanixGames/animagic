"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldManager = void 0;
const Manager_1 = require("./Manager");
class WorldManager extends Manager_1.Manager {
    constructor() {
        super();
        this.createPlayer = (id) => {
        };
        this.addState = (id, state) => {
            this.locationsState.set(id, state);
            console.log('add new state', id);
        };
        this.removeState = (id) => {
            this.locationsState.delete(id);
            console.log('remove new state', id);
        };
        this.locationsState = new Map();
        this.players = new Map();
    }
    init() {
        return Promise.resolve();
    }
    destroy() {
        return Promise.resolve();
    }
    update(delta) {
        this.locationsState.forEach((state) => {
            state.entities.forEach((entity) => {
                if (entity.velX === 0 && entity.velY === 0) {
                    return;
                }
                if (entity.velX !== 0) {
                    entity.x += entity.velX * delta;
                }
                if (entity.velY !== 0) {
                    entity.y += entity.velY * delta;
                }
            });
        });
    }
}
exports.WorldManager = WorldManager;
//# sourceMappingURL=WorldManager.js.map