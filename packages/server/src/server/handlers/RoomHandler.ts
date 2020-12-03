import { Server } from "colyseus";

import { GrindirLocation } from '../../locations';
import { World } from '../../world';

export const RoomHandler = (server: Server) => {
  server.define('grindir', GrindirLocation, {});
  server.define('world', World, {
    maxClients: 10,
    allowReconnectionTime: 120,
  });
};
