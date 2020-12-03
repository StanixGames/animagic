"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomHandler = void 0;
const locations_1 = require("../../locations");
const world_1 = require("../../world");
const RoomHandler = (server) => {
    server.define('grindir', locations_1.GrindirLocation, {});
    server.define('world', world_1.World, {
        maxClients: 10,
        allowReconnectionTime: 120,
    });
};
exports.RoomHandler = RoomHandler;
//# sourceMappingURL=RoomHandler.js.map