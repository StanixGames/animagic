"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldLocationState = void 0;
const Game_1 = require("../../Game");
const models_1 = require("../../models");
const LocationState_1 = require("../LocationState");
class WorldLocationState extends LocationState_1.LocationState {
    constructor() {
        super('world');
        this.init = () => {
            // let i = 0;
            // for (let x = 0; x < 50; x += 1) {
            //   for (let y = 0; y < 50; y += 1) {
            //     const tile = new Tile(x % 3, x, y);
            //     this.tiles.setAt(i, tile);
            //     i += 1;
            //   }
            // }
            //   const entity = new Entity(
            //     v4(),
            //     Math.random() * 40 - 20,
            //     Math.random() * 40 - 20,
            //     1,
            //     2,
            //     Math.random() * 0.5 - 0.2,
            //     Math.random() * 0.5 - 0.2,
            //     0xff22df
            //   )
            //   this.entities.set(entity.id, entity);
            // }
            Game_1.game.persistManager.loadLocationState(this.id)
                .then((persistState) => {
                const { bounds, tiles, entities } = persistState;
                this.bounds = models_1.AABB.copy(bounds);
                let i = 0;
                tiles.forEach((tile) => {
                    const schemaTile = models_1.Tile.copy(tile);
                    this.tiles.setAt(i, schemaTile);
                    i += 1;
                });
                entities.forEach((entity) => {
                    const schemaEntity = models_1.Entity.copy(entity);
                    this.entities.set(schemaEntity.id, schemaEntity);
                });
            })
                .catch((err) => {
                console.log('Cannot read state ', this.id, err);
            });
            Game_1.game.worldManager.addState('world', this);
        };
        this.destroy = () => {
            console.log('destroy state ', this.id);
            Game_1.game.persistManager.saveLocationState(this)
                .then(() => {
                console.log('Saved state ', this.id);
            })
                .catch(() => {
                console.log('Cannot save state', this.id);
            });
            Game_1.game.worldManager.removeState('world');
        };
    }
}
exports.WorldLocationState = WorldLocationState;
//# sourceMappingURL=WorldLocationState.js.map