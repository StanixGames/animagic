import { GameSocket } from './types';

type PacketType =
  | 'gameJoin'
  | 'playerMove'
  | 'invalidPacket';

export const PACKET_TYPES: Array<PacketType> = [
  'gameJoin',
  'playerMove',
  'invalidPacket',
];

export type Packet = {
  type: PacketType;
  socket: GameSocket;
  payload: string | {
    player: string;
    gameId: string;
  } | {
    playerId: string;
    position: {
      x: number;
      y: number;
    };
  };
}