type PacketType =
| 'CLIENT_CONNECTED'
| 'CLIENTS_STATE'

| 'INVALID_PACKET';

export namespace Packet {
  export interface In {
    type: PacketType;
  }

  export interface Out {
    type: PacketType;
  }
}