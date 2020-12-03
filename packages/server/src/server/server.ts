import { Server } from "colyseus";
import { createServer } from "http";
import express from "express";
import dotenv from 'dotenv';

import { game } from "../Game";

import { APIHandler, RoomHandler } from './handlers';

dotenv.config();

const SERVER_PORT = Number(process.env.SERVER_PORT);

const app = express();
const server = createServer(app);
const gameServer = new Server({
  server,
});

APIHandler(app);
RoomHandler(gameServer);

gameServer.listen(SERVER_PORT);

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');

  game.destroy();
});
