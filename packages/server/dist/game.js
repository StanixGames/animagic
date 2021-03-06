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
exports.game = void 0;
const managers_1 = require("./managers");
class Game {
    constructor() {
        this.tickLengthMs = 1000 / 10;
        this.previousTick = Date.now();
        this.init = () => __awaiter(this, void 0, void 0, function* () {
            yield this.locationManager.init();
            yield this.worldManager.init();
            yield this.persistManager.init();
            yield this.generatorManager.init();
            this.loop();
        });
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
            this.locationManager.update(delta);
            this.worldManager.update(delta);
        };
        this.destroy = () => __awaiter(this, void 0, void 0, function* () {
            yield Promise.all([
                this.locationManager.destroy(),
                this.worldManager.destroy(),
                this.persistManager.destroy(),
                this.generatorManager.destroy(),
            ]);
        });
        this.locationManager = new managers_1.LocationManager();
        this.worldManager = new managers_1.WorldManager();
        this.persistManager = new managers_1.PersistManager();
        this.generatorManager = new managers_1.GeneratorManager();
        this.init();
    }
}
exports.game = new Game();
//# sourceMappingURL=Game.js.map