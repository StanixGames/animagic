import { Game } from '../Game';

import { Manager } from './Manager';
import { ConsumerClient } from './ConsumerClient';
import { PacketManager } from './PacketManager';
import { ClientManager } from './ClientManager';
import {
  ClientConnectedPacket,
  ClientsStatePacket,
} from './packets';

const WS_URL = 'ws://localhost:1993?1ab2f959-54e5-4f0b-b614-5c3029ac5edc.69f9b548-9b3d-405c-b45a-ad116b0ad746';
const PACKETS_PER_UPDATE = 20;

export class NetworkManager extends Manager {
  private ws: WebSocket;

  constructor(game: Game) {
    super(game);
    this.ws = new WebSocket(WS_URL);
  }

  init(): void {
    this.ws.onopen = this.handleOpen;
    this.ws.onclose = this.handleClose;
    this.ws.onmessage = this.handleMessage;
    this.ws.onerror = this.handleError;
  }
  
  destroy(): void {
    //
  }

  update = (delta: number): void => {
    PacketManager.update(delta);
  }

  handleOpen = (event: any): void => {
    console.log('connected');

    // this.ws.send(JSON.stringify({
    //   type: 'gameJoin',
    //   payload: {
    //     playerId: 'Player123',
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

      PacketManager.queuePacket(packet);
    } catch (e) {
      console.error(e.message);
    }
  };

  public sendMessage = (message: string): void => {
    this.ws.send(message);
  }
}