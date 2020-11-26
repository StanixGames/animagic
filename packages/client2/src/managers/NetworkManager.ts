import {
  Packet,
  ClientConnectedPacket,
  ClientsStatePacket,
  ClientJoinGameRequestPacket,
  // PlayerMovePacket,
} from '@animagic/shared';

import { Game } from '../Game';
import { Manager } from '../types';
import { Queue } from '../utils/Queue';
import { GameClient } from '../models';

import { PacketManager } from './PacketManager';

const WS_URL = 'ws://localhost:1993?1ab2f959-54e5-4f0b-b614-5c3029ac5edc.69f9b548-9b3d-405c-b45a-ad116b0ad746';
const PACKETS_PER_UPDATE = 20;

export class NetworkManager extends Manager {
  private ws: WebSocket;
  private packets: Queue<Packet>;
  private gameClient: GameClient | null;
  private clients: Map<string, GameClient>;

  constructor(game: Game) {
    super(game);
    
    this.gameClient = null;
    this.clients = new Map<string, GameClient>();
    this.packets = new Queue<Packet>();
  }

  init(): void {
    this.ws = new WebSocket(WS_URL);
    this.ws.onopen = this.handleOpen;
    this.ws.onclose = this.handleClose;
    this.ws.onmessage = this.handleMessage;
    this.ws.onerror = this.handleError;
  }
  
  destroy(): void {
    //
  }

  update = (delta: number): void => {
    let processedPackets = 0;

    while (processedPackets < PACKETS_PER_UPDATE) {
      if (this.packets.size() === 0) {
        return;
      }

      const packet = this.packets.pop();

      console.log('processing', packet)

      switch (packet.type) {
        case 'CLIENT_CONNECTED': {
          const packetConnect = packet as ClientConnectedPacket;
          const gameClient = packetConnect.client as GameClient;
          this.gameClient = gameClient;

          console.log('setup client', this.gameClient)

          const joinGamePacket: ClientJoinGameRequestPacket = {
            type: 'CLIENT_JOIN_GAME_REQUEST',
            client: packetConnect.client,
          };
          console.log('join game')
          const data = JSON.stringify(joinGamePacket);
          this.sendMessage(data);

          break;
        }
        case 'CLIENTS_STATE': {
          const packetClientsState = packet as ClientsStatePacket;
          packetClientsState.clients.forEach((client: GameClient) => {
            this.clients.set(client.id, client);
          });
          
          console.log('set state clients', this.clients.size);
          break;
        }
      }
      // switch (packet.type) {
      //   // case 'CLIENT_CONNECTED': {
      //   //   // packet.socket.send(JSON.stringify(packet));
      //   //   // console.log('get ')
      //   //   break;
      //   // }
      //   case 'gameJoin': {
      //     this.game.playerManager.addPlayer({
      //       playerId: packet.payload.playerId,
      //       position: {
      //         x: packet.payload.x,
      //         y: packet.payload.y,
      //       }
      //     });
      //     break;
      //   }
      //   case 'playerMove': {
      //     // console.log(packet, ',,,,');
      //       this.game.playerManager.move(packet.payload.x, packet.payload.y, packet.payload.playerId);
      //     // packet.socket.send('move player');
      //     // this.handleBroadcast(JSON.stringify(packet.payload) + ' is moving');
      //     break;
      //   }
      // }

      processedPackets += 1;
    }
  }

  handleOpen = (event: any): void => {
    console.log('connected');

    // this.ws.send(JSON.stringify({
    //   type: 'gameJoin',
    //   payload: {
    //     playerId: this.playerId,
    //     position: {
    //       x: (this.game.playerManager.getPos().x || 0) - window.innerWidth / 2,
    //       y: (this.game.playerManager.getPos().y || 0) - window.innerHeight / 2,
    //     }
    //   }
    // }))
  };

  handleClose = (event: any): void => {
    console.log('disconnected');
  };

  handleError = (event: any): void => {
    console.log('error', event.data);
  };

  handleMessage = (event: any): void => {
    console.log('mesage', event.data);

    try {
      const packet = PacketManager.parsePacket(event.data);

      if (!packet) {
        console.log('Invalid Packet!', event.data);
        return;
      }

      this.packets.push(packet);
    } catch (e) {
      console.error(e.message);
    }
  };

  public sendMessage = (message: string): void => {
    this.ws.send(message);
  }
}