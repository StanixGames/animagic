import {
  Packet,
  ClientsStatePacket,
  PlayerJoinPacket,
  WorldUpdatePacket,
  WorldChunkUpdatePacket,
} from '../network/packets';
import { Queue } from '../utils/Queue';

import { store } from '../ui/store';
import * as PlayersActions from '../ui/store/players/players.actions';

import { Game } from '../Game';

import { ClientManager } from './ClientManager';

const OUT_DELAY_MAX_TIME = 1;

const PACKETS_PER_UPDATE = 20;

const packets: Queue<Packet.In> = new Queue<Packet.In>();
const packetsOut: Queue<Packet.Out> = new Queue<Packet.Out>();

export class PacketManager {
  static counterDeltaTime = 0;

  public static updateOut = (delta: number, game: Game, ws?: WebSocket) => {
    if (!ws) {
      console.log('Invalid socket!');
      return;
    }
    if (packetsOut.size() < 1) {
      return;
    }

    console.log('Update out packets time', delta, packetsOut.size());

    let processedPackets = 0;

    while (processedPackets < PACKETS_PER_UPDATE) {
      if (packetsOut.size() < 1) {
        break;
      }

      const packet = packetsOut.pop();

      ws.send(JSON.stringify(packet));

      processedPackets += 1;
    }

    console.log('send packets', processedPackets);

    if (packetsOut.size() > 0) {
      console.log('LEFT PACKETS');
    }
  }

  public static update = (delta: number, game: Game, ws?: WebSocket) => {
    PacketManager.counterDeltaTime += delta;

    if (PacketManager.counterDeltaTime > OUT_DELAY_MAX_TIME) {
      PacketManager.updateOut(PacketManager.counterDeltaTime, game, ws);

      PacketManager.counterDeltaTime = 0;
    }

    let processedPackets = 0;

    while (processedPackets < PACKETS_PER_UPDATE) {
      if (packets.size() === 0) {
        return;
      }

      const packet = packets.pop();
      // console.log('processing', packet);

      if (!packet) {
        // console.log('Invalid packet!');
        return;
      }
      
      switch (packet.type) {
        case 'PLAYER_JOIN': {
          const typedPacket = packet as PlayerJoinPacket.In;

          game.worldManager.addPlayer(typedPacket.entity);
          game.cameraManager.moveCamera(
            typedPacket.entity.position.x,
            typedPacket.entity.position.y,
          );
          game.playerManager.pos.x = typedPacket.entity.position.x;
          game.playerManager.pos.y = typedPacket.entity.position.y;
          
          break;
        };

        case 'WORLD_UPDATE': {
          const typedPacket = packet as WorldUpdatePacket.In;

          game.worldManager.patchWorld(
            typedPacket.entities,
          );

          break;
        }

        case 'WORLD_CHUNK_UPDATE': {
          const typedPacket = packet as WorldChunkUpdatePacket.In;

          game.worldManager.patchChunk(typedPacket.chunk);
          break;
        }

        case 'CLIENTS_STATE': {
          // const typedPacket = packet as ClientsStatePacket.In;
          // const players = typedPacket.clients.map((client) => client.login);
          
          // store.dispatch(PlayersActions.setPlayers(players));

          break;
        };

        default: {
          // console.log('Invalid packet', packet);
        }
      }

      processedPackets += 1;
    }
  }

  public static queuePacketIn = (packet: Packet.In) => {
    packets.push(packet);
  }

  public static queuePacketOut = (packet: Packet.Out) => {
    packetsOut.push(packet);
  }

  public static parsePacket = (message: string): Packet.In | null => {
    const data = JSON.parse(message);
    const packet: Packet.In = {
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
}
