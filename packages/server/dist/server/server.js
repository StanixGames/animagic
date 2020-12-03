"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colyseus_1 = require("colyseus");
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const Game_1 = require("../Game");
const handlers_1 = require("./handlers");
dotenv_1.default.config();
const SERVER_PORT = Number(process.env.SERVER_PORT);
const app = express_1.default();
const server = http_1.createServer(app);
const gameServer = new colyseus_1.Server({
    server,
});
handlers_1.APIHandler(app);
handlers_1.RoomHandler(gameServer);
gameServer.listen(SERVER_PORT);
process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    Game_1.game.destroy();
});
//# sourceMappingURL=server.js.map