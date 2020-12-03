"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldLocation = void 0;
const WorldLocationState_1 = require("./WorldLocationState");
const Location_1 = require("../Location");
class WorldLocation extends Location_1.Location {
    constructor() {
        super('world', WorldLocationState_1.WorldLocationState);
    }
}
exports.WorldLocation = WorldLocation;
//# sourceMappingURL=WorldLocation.js.map