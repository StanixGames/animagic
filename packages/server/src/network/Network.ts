import { Server } from 'ws';
import { Queue } from '@animagic/shared';

import { GameSocket } from './types';
import { Packet } from './Packets';
import { PacketManager } from './PacketManager';

const PACKETS_PER_UPDATE = 20;

export type Player = {
  playerId: string;
  position: {
    x: number;
    y: number;
  };
}

export class Network {
  ws: Server;
  private packets: Queue<Packet>;
  private players: Array<Player>;

  public constructor(port: string) {
    this.packets = new Queue<Packet>();
    this.players = [];

    this.ws = new Server({
      port: parseInt(port, 10),
    });
    console.log('Started websocket on port ', port);

    this.ws.on('connection', (socket: GameSocket) => {
      this.handleConnection(socket);
    })
  }

  public update = (delta: number) => {
    let processedPackets = 0;

    while (processedPackets < PACKETS_PER_UPDATE) {
      if (this.packets.size() === 0) {
        return;
      }

      const packet = this.packets.pop();

      // console.log('processing', packet)

      switch (packet.type) {
        case 'invalidPacket': {
          packet.socket.send(JSON.stringify(packet));
          break;
        }
        case 'gameJoin': {
          if (this.players.length > 0) {
            this.players.forEach(player => {
              packet.socket.send(JSON.stringify({
                type: 'gameJoin',
                payload: player,
              }))
            })
          }
          if (!this.players.find(p => p.playerId === (packet.payload as any).playerId)) {
            this.players.push({
              playerId: (packet.payload as any).playerId,
              position: (packet.payload as any).position,
            });
          }
          packet.socket.send('Init data');
          this.handleBroadcast(JSON.stringify({
            type: 'gameJoin',
            payload: packet.payload,
          }));
          break;
        }
        case 'playerMove': {
          packet.socket.send('move player');
          this.handleBroadcast(JSON.stringify({
            type: 'playerMove',
            payload: packet.payload,
          }));
          break;
        }
      }

      processedPackets += 1;
    }
  }

  private handleConnection(socket: GameSocket) {
    console.log('connected')
    socket.on('message', (message: string) => {
      try {
        const packet = PacketManager.parsePacket(message, socket);
        this.packets.push(packet);
      } catch (e) {
        console.error(e.message);
      }
    });
  }

  private handleBroadcast(message: string) {
    this.ws.clients.forEach((client: GameSocket) => {
      client.send(message);
    });
  }
}
