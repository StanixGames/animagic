// import { Client } from '@animagic/shared';
// import { GameSocket } from './types';
// type PacketType =
//   | 'CLIENT_CONNECTED'
//   | 'CLIENT_DISCONNECTED'
//   | 'CLIENTS_STATE'
//   | 'gameJoin'
//   | 'playerMove'
//   | 'invalidPacket';
// export const PACKET_TYPES: Array<PacketType> = [
//   'CLIENT_CONNECTED',
//   'CLIENT_DISCONNECTED',
//   'CLIENTS_STATE',
//   'gameJoin',
//   'playerMove',
//   'invalidPacket',
// ];
// export interface Packet {
//   type: PacketType;
//   // socket: GameSocket;
//   // payload: string | {
//   //   player: string;
//   //   gameId: string;
//   // } | {
//   //   playerId: string;
//   //   position: {
//   //     x: number;
//   //     y: number;
//   //   };
//   // };
//   // public toString = (): string => {
//   //   return JSON.stringify(this);
//   // }
// }
// // export interface ClientConnectedPacket extends Packet {
// //   payload: {
// //     client: Client;
// //   };
// // };
// // export interface ClientDisconnectedPacket extends Packet {
// //   payload: {
// //     client: Client;
// //   };
// // };
// // export interface ClientsStatePacket extends Packet {
// //   payload: {
// //     clients: Array<Client>;
// //   };
// // };
//# sourceMappingURL=Packets.js.map