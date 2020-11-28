"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.game = void 0;
const managers_1 = require("./managers");
const network_1 = require("./network");
class Game {
    constructor() {
        this.tickLengthMs = 1000 / 20;
        this.previousTick = Date.now();
        this.loop = () => {
            var now = Date.now();
            if (this.previousTick + this.tickLengthMs <= now) {
                var delta = (now - this.previousTick) / 1000;
                this.previousTick = now;
                this.update(delta);
            }
            if (Date.now() - this.previousTick < this.tickLengthMs - 16) {
                setTimeout(this.loop);
            }
            else {
                setImmediate(this.loop);
            }
        };
        this.update = (delta) => {
            network_1.NetworkManager.update(delta);
            this.worldManager.update(delta);
        };
        this.destroy = () => {
            this.worldManager.destroy();
        };
        this.worldManager = new managers_1.WorldManager();
        this.loop();
    }
}
exports.game = new Game();
//# sourceMappingURL=Game.js.map