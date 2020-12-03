"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldManager = void 0;
const Manager_1 = require("./Manager");
const Game_1 = require("../Game");
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
        this.world = undefined;
    }
    init() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const persistState = yield Game_1.game.persistManager.loadWorldState();
                const players = new Map();
                persistState.players.forEach((player) => {
                    players.set(player.id, player);
                });
                this.world = {
                    players,
                };
                console.log('Load the world state');
                return resolve();
            }
            catch (error) {
                console.log('Cannot load the world state');
                return reject(error);
            }
        }));
    }
    destroy() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield Game_1.game.persistManager.saveWorldState(this.world);
                console.log('Saved the world state');
                return resolve();
            }
            catch (error) {
                console.log('Cannot save the world state');
                return reject(error);
            }
        }));
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