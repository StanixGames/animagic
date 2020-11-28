import WebSocket from 'ws';

import { ServerClient } from './ServerClient';

import { PacketManager } from './PacketManager';
import { ClientManager } from './ClientManager';
import {
  ClientConnectedPacket,
  ClientsStatePacket,
  PlayerJoinPacket,
} from './packets';

export class NetworkManager {
  public static handleConnection = (
    socket: WebSocket,
    session: string,
    login: string,
    firstName: string,
    lastName: string,
  ) => {
    const client: ServerClient = {
      session,
      socket,
      login,
      firstName,
      lastName,
    };

    ClientManager.add(client);
    // const clientConnectedPacketIn: ClientConnectedPacket.In = {
    //   type: 'CLIENT_CONNECTED',
    //   socket,
    //   client: ClientManager.getByLogin(client.login),
    // };
    const playerJoinPacketIn: PlayerJoinPacket.In = {
      type: 'PLAYER_JOIN',
      socket,
      login: client.login,
    };
    PacketManager.queuePacket(playerJoinPacketIn);

    // broadcast all clients
    const clientsStatePacketIn: ClientsStatePacket.In = {
      type: 'CLIENTS_STATE',
      socket,
      clients: ClientManager.getAllAsArray(),
    }
    PacketManager.queuePacket(clientsStatePacketIn);
  }

  public static handleDisconnection = () => {
    //
  }

  public static update = (delta: number) => {
    PacketManager.update(delta);
  }
}
