import WebSocket from 'ws';

import {
  Packet,
  ClientConnectedPacket,
  ClientsStatePacket,
  PlayerJoinPacket,
} from '../network/packets';
import { Queue } from '../utils';
import { game } from '../Game';

import { ClientManager } from './ClientManager';

const PACKETS_PER_UPDATE = 20;

const packets: Queue<Packet.In> = new Queue<Packet.In>();

export class PacketManager {
  public static update = (delta: number) => {
    let processedPackets = 0;

    while (processedPackets < PACKETS_PER_UPDATE) {
      if (packets.size() === 0) {
        return;
      }

      const packet = packets.pop();
      console.log('processing', packet)
      
      switch (packet.type) {
        case 'PLAYER_JOIN': {
          const typedPacket = packet as PlayerJoinPacket.In;
          const entity = game.worldManager.getPlayerEntity(typedPacket.login);

          if (!entity) {
            console.error('INVALID PLAYER ENTITY INSTANCE');
            break;
          }

          const packetOut: PlayerJoinPacket.Out = {
            type: 'PLAYER_JOIN',
            login: typedPacket.login,
            entity,
          }

          const data = JSON.stringify(packetOut);
          packet.socket.send(data);
          break;
        };

        case 'CLIENTS_STATE': {
          const typedPacket = packet as ClientsStatePacket.In;
          const packetOut: ClientsStatePacket.Out = {
            type: 'CLIENTS_STATE',
            clients: typedPacket.clients.map((client) => ({
              login: client.login,
              firstName: client.firstName,
              lastName: client.lastName,
            })),
          };

          const data = JSON.stringify(packetOut);
          PacketManager.broadcast(data);
        };

        default: {
          const { socket } = packet;
          const packetOut = {
            type: 'INVALID_PACKET',
            // data: rest,
          };

          const data = JSON.stringify(packetOut);
          socket.send(data);
        }
      }

      processedPackets += 1;
    }
  }

  public static queuePacket = (packet: Packet.In) => {
    packets.push(packet);
  }

  public static parsePacket = (message: string, socket: WebSocket): Packet.In | null => {
    const data = JSON.parse(message);
    const packet: Packet.In = {
      socket,
      ...data,
    };

    if (!PacketManager.isPacketValid(packet)) {
      return null;
    }

    return packet;
  };

  public static isPacketValid = (packet: Packet.In) => {
    if (!packet || !packet.type) {
      return false;
    }

    return true;
  }

  private static broadcast = (data: string) => {
    for (let client of ClientManager.getAll()) {
      client.socket.send(data);
    }
  }
}
