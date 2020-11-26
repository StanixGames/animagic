import {
  Packet,
  PACKET_TYPES,
} from '@animagic/shared';

export class PacketManager {
  public static parsePacket = (message: string): Packet | null => {
    const packet = JSON.parse(message) as Packet;

    if (!PacketManager.isPacketValid(packet)) {
      return null;
    }

    return packet;
  };

  public static isPacketValid = (packet: Packet) => {
    if (!packet || !packet.type || !PACKET_TYPES.includes(packet.type)) {
      return false;
    }

    return true;
  }
}