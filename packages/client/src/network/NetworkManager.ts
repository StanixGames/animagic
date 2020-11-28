import { Game } from '../Game';

import { Manager } from './Manager';
import { PacketManager } from './PacketManager';

const WS_URL = 'ws://localhost:1993';

const WEBSOCKET_OPEN = 1;
const WEBSOCKET_CLOSED = 3;

export class NetworkManager extends Manager {
  private ws?: WebSocket;
  private session?: string;

  constructor(game: Game) {
    super(game);
  }

  attachSession = (session: string) => {
    this.session = session;
  }

  init(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.session) {
        reject('Invalid session');
        return;
      }

      const url = `${WS_URL}?${this.session}`;

      this.ws = new WebSocket(url);
      this.ws.onopen = this.handleConnection;
      this.ws.onclose = this.handleClose;
      this.ws.onmessage = this.handleMessage;
      this.ws.onerror = this.handleError;

      this.waitForSocketStateChange(this.ws, WEBSOCKET_OPEN, resolve);
    });
  }
  
  destroy(): Promise<void> {
    return new Promise((resolve) => {
      if (this.ws) {
        this.ws.close();
        // setTimeout(resolve, 2000);
        this.waitForSocketStateChange(this.ws, WEBSOCKET_CLOSED, resolve);
      } else {
        resolve();
      }
    });
  }

  private waitForSocketStateChange = (socket: WebSocket, state: number, callback: () => void) => {
    setTimeout(() => {
      if (socket.readyState === state) {
        if (callback != null) {
          callback();
        }
      } else {
        console.log("wait for websocket state change...")
        this.waitForSocketStateChange(socket, state, callback);
      }
  }, 500);
}

  update = (delta: number): void => {
    PacketManager.update(delta);
  }

  handleConnection = (event: any): void => {
    console.log('connected');
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
    if (this.ws) {
      this.ws.send(message);
    }
  }
}