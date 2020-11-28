"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldManager = void 0;
const Manager_1 = require("./Manager");
const world_1 = require("../world");
class WorldManager extends Manager_1.Manager {
    constructor() {
        super();
        this.getPlayerEntity = (login) => {
            const playableEntity = this.world.playableEntities.get(login);
            if (!playableEntity) {
                return null;
            }
            const entity = this.world.entities.get(playableEntity.id);
            return entity;
        };
        this.world = new world_1.World();
    }
    init() {
        return Promise.resolve();
    }
    destroy() {
        return Promise.resolve();
    }
    update(delta) {
        this.world.update(delta);
    }
}
exports.WorldManager = WorldManager;
//# sourceMappingURL=WorldManager.js.map