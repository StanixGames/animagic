type PacketType =
| 'CLIENT_CONNECTED'
| 'CLIENTS_STATE'

| 'PLAYER_JOIN'
| 'PLAYER_MOVE'

| 'WORLD_UPDATE'
| 'WORLD_CHUNK_UPDATE'

| 'INVALID_PACKET';

export namespace Packet {
  export interface In {
    type: PacketType;
  }

  export interface Out {
    type: PacketType;
  }
}