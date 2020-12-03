"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrindirLocation = void 0;
const GrindirLocationState_1 = require("./GrindirLocationState");
const Location_1 = require("../Location");
class GrindirLocation extends Location_1.Location {
    constructor() {
        super('grindir', GrindirLocationState_1.GrindirLocationState);
    }
}
exports.GrindirLocation = GrindirLocation;
//# sourceMappingURL=GrindirLocation.js.map