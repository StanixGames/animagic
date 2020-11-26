import WebSocket from 'ws';

import {
  Packet,
  ClientConnectedPacket,
  ClientsStatePacket,
} from '../network/packets';
import { Queue } from '../utils/Queue';

import { store } from '../ui/store';
import * as PlayersActions from '../ui/store/players/players.actions';

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
      console.log('processing', packet);

      if (!packet) {
        console.log('Invalid packet!');
        return;
      }
      
      switch (packet.type) {
        case 'CLIENT_CONNECTED': {
          const typedPacket = packet as ClientConnectedPacket.In;
          const packetOut: ClientConnectedPacket.Out = {
            type: 'CLIENT_CONNECTED',
            client: {
              login: typedPacket.client.login,
              firstName: typedPacket.client.firstName,
              lastName: typedPacket.client.lastName,
            }
          }

          console.log('PROCEES', packetOut)
          break;
        };

        case 'CLIENTS_STATE': {
          const typedPacket = packet as ClientsStatePacket.In;
          const players = typedPacket.clients.map((client) => client.login);
          
          store.dispatch(PlayersActions.setPlayers(players));

          break;
        };

        default: {
          // const { socket } = packet;
          // const packetOut = {
          //   type: 'INVALID_PACKET',
          //   // data: rest,
          // };

          // const data = JSON.stringify(packetOut);
          // socket.send(data);
        }
      }

      processedPackets += 1;
    }
  }

  public static queuePacket = (packet: Packet.In) => {
    packets.push(packet);
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
