"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomHandler = void 0;
const locations_1 = require("../../locations");
const RoomHandler = (server) => {
    server.define('grindir', locations_1.GrindirLocation, {});
};
exports.RoomHandler = RoomHandler;
//# sourceMappingURL=RoomHandler.js.map