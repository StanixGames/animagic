import { Vector } from '../types';

export interface GameSocket extends WebSocket {
  // isAlive: boolean;
}

export type Player = {
  playerId: string;
  position: Vector;
}