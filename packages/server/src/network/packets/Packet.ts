import WebSocket from 'ws';

type PacketType =
| 'CLIENT_CONNECTED'
| 'CLIENTS_STATE'

| 'PLAYER_JOIN'

| 'INVALID_PACKET';

export namespace Packet {
  export interface In {
    type: PacketType;
    socket: WebSocket;
  }

  export interface Out {
    type: PacketType;
  }
}