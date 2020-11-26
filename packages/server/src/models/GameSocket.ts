import WebSocket from 'ws';

export interface GameSocket extends WebSocket.Server {
  // isAlive: boolean;
}