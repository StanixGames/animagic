"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const world_1 = require("./world");
const network_1 = require("./network");
class Game {
    constructor(port) {
        this.tickLengthMs = 1000 / 20;
        this.previousTick = Date.now();
        this.loop = () => {
            var now = Date.now();
            // this.actualTicks += 1;
            if (this.previousTick + this.tickLengthMs <= now) {
                var delta = (now - this.previousTick) / 1000;
                this.previousTick = now;
                this.update(delta);
                // console.log('delta', delta, '(target: ' + this.tickLengthMs + ' ms)', 'node ticks', this.actualTicks)
                // this.actualTicks = 0;
            }
            if (Date.now() - this.previousTick < this.tickLengthMs - 16) {
                setTimeout(this.loop);
            }
            else {
                setImmediate(this.loop);
            }
        };
        this.update = (delta) => {
            this.world.update(delta);
            this.network.update(delta);
        };
        this.network = new network_1.Network(port);
        this.world = new world_1.World();
        this.players = new Map();
        this.loop();
    }
}
exports.Game = Game;
//# sourceMappingURL=game.js.map