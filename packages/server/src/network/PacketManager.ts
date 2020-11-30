import WebSocket from 'ws';

import {
  Packet,
  ClientConnectedPacket,
  ClientsStatePacket,
  PlayerJoinPacket,
  WorldUpdatePacket,
  WorldChunkUpdatePacket,
  PlayerMovePacket,
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
        break;
      }

      const packet = packets.pop();
      // console.log('processing', packet)
      
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

          packet.socket.send(JSON.stringify(packetOut));

          // send entities
          const worldUpdatePacketOut: WorldUpdatePacket.Out = {
            type: 'WORLD_UPDATE',
            entities: game.worldManager.getEntitiesAsArray(),
          }

          packet.socket.send(JSON.stringify(worldUpdatePacketOut));

          // send chunks
          const chunks = game.worldManager.getChunksInRadius(
            Math.floor(entity.position.x / 8),
            Math.floor(entity.position.y / 8),
          );

          chunks.forEach((chunk) => {
            const worldUpdateChunkPacketOut: WorldChunkUpdatePacket.Out = {
              type: 'WORLD_CHUNK_UPDATE',
              chunk
            }
            packet.socket.send(JSON.stringify(worldUpdateChunkPacketOut));
          });
          break;
        };

        case 'PLAYER_MOVE': {
          const typedPacket = packet as PlayerMovePacket.In;
          // console.log('player move', typedPacket.velocity, typedPacket.login);

          const entity = game.worldManager.getPlayerEntity(typedPacket.login);

          if (!entity) {
            console.error('INVALID PLAYER ENTITY INSTANCE');
            break;
          }

          game.worldManager.moveEntity(
            entity.id,
            typedPacket.velocity,
          );

          break;
        }

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

      ///// UPdate state

    }

    // send entities
    const worldUpdatePacketOut: WorldUpdatePacket.Out = {
      type: 'WORLD_UPDATE',
      entities: game.worldManager.getEntitiesAsArray(),
    }

    PacketManager.broadcast(JSON.stringify(worldUpdatePacketOut));
  }

  public static queuePacket = (packet: Packet.In) => {
    packets.push(packet);
  }

  public static parsePacket = (message: string, socket: WebSocket, login: string): Packet.In | null => {
    const data = JSON.parse(message);
    const packet: Packet.In = {
      socket,
      login,
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
