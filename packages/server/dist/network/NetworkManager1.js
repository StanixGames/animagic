// import WebSocket from 'ws';
// import express from 'express';
// import http from 'http';
// import {v4} from 'uuid';
// import dotenv from 'dotenv';
// import bodyParser from 'body-parser';
// import { Queue, Client } from '@animagic/shared';
// import { GameSocket } from './types';
// import {
//   Packet,
//   ClientConnectedResponsePacket,
//   ClientsStatePacket,
//   ClientJoinGameApprovedPacket,
//   ClientManager,
// } from '@animagic/shared';
// import { PacketManager } from './PacketManager';
// import { ServerClient } from '../models';
// const PACKETS_PER_UPDATE = 20;
// export type Player = {
//   playerId: string;
//   position: {
//     x: number;
//     y: number;
//   };
// }
// const createClient = (login: string, socket: GameSocket): ServerClient => {
//   const newClientId = `${Math.random().toFixed(3)}.${Math.random().toFixed(3)}`;
//   return {
//     id: newClientId,
//     socket,
//   };
// }
// export class NetworkManager {
//   ws: Server;
//   private clientManager: ClientManager<ServerClient>;
//   private packets: Queue<Packet>;
//   public constructor(port: string) {
//     this.clientManager = new ClientManager<ServerClient>();
//     this.packets = new Queue<Packet>();
//     this.ws = new Server({
//       port: parseInt(port, 10),
//     });
//     console.log('Started websocket on port ', port);
//     this.ws.on('connection', this.handleConnection);
//     this.ws.on('close', this.handleDisconnection);
//   }
//   public update = (delta: number) => {
//     let processedPackets = 0;
//     while (processedPackets < PACKETS_PER_UPDATE) {
//       if (this.packets.size() === 0) {
//         return;
//       }
//       const packet = this.packets.pop();
//       console.log('processing', packet)
//       switch (packet.type) {
//         case 'CLIENT_CONNECTED_RESPONSE': {
//           const packetConnect = packet as ClientConnectedResponsePacket;
//           const client = this.clientManager.getById(packetConnect.client.id);
//           const data = JSON.stringify(packetConnect);
//           client.socket.send(data);
//           break;
//         };
//         case 'CLIENTS_STATE': {
//           const data = JSON.stringify(packet);
//           this.handleBroadcast(data);
//         };
//         // case 'CLIENT_DISCONNECTED': {
//         //   const data = JSON.stringify(packet);
//         //   this.handleBroadcast(data);
//         // }
//         // case 'CLIENT_JOIN_GAME_REQUEST': {
//         //   const playerEntityId = 'entity12345';
//         //   const packetReq = packet as ClientConnectedPacket;
//         //   const serverClient = packetReq.client as ServerClient;
//         //   const resPacket: ClientJoinGameApprovedPacket = {
//         //     type: 'CLIENT_JOIN_GAME_APPROVED',
//         //     client: {
//         //       id: packetReq.client.id
//         //     },
//         //     playerEntityId,
//         //   };
//         //   const data = JSON.stringify(resPacket);
//         //   serverClient.socket.send(data);
//         // }
//       }
//       processedPackets += 1;
//     }
//   }
//   private handleConnection = (socket: GameSocket) => {
//     const client: ServerClient = createClient('test', socket);
//     this.clientManager.add(client);
//     const packetConnect: ClientConnectedResponsePacket = {
//       type: 'CLIENT_CONNECTED_RESPONSE',
//       client: this.clientManager.getByIdWithBasicType(client.id),
//     };
//     this.packets.push(packetConnect);
//     // broadcast all clients
//     const clients: Array<Client> = this.clientManager.getAllWithBasicType();
//     const packetClientsState: ClientsStatePacket = {
//       type: 'CLIENTS_STATE',
//       clients,
//     }
//     this.packets.push(packetClientsState);
//     socket.on('message', (message: string) => {
//       console.log(message);
//       try {
//         const packet = PacketManager.parsePacket(message);
//         if (!packet) {
//           console.log('Invalid Packet!', message);        
//           return;
//         }
//         this.packets.push(packet);
//       } catch (e) {
//         console.error(e.message);
//       }
//     });
//   }
//   private handleDisconnection = (socket: GameSocket) => {
//     console.log('someone disconnected');
//   }
//   private handleBroadcast(message: string) {
//     this.ws.clients.forEach((client: GameSocket) => {
//       client.send(message);
//     });
//   }
// }
//# sourceMappingURL=NetworkManager1.js.map