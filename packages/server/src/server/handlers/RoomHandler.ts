import { Server } from "colyseus";

import { GrindirLocation } from '../../locations';

export const RoomHandler = (server: Server) => {
  server.define('grindir', GrindirLocation, {});
};
