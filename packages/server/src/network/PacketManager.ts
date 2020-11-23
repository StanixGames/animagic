import { Packet, PACKET_TYPES } from './Packets';
import { GameSocket } from './types';

export class PacketManager {
  public static parsePacket = (message: string, socket: GameSocket): Packet => {
    const packet = JSON.parse(message);

    if (PacketManager.isPacketValid(packet)) {
      return {
        ...packet,
        socket,
      };
    }

    return {
      type: 'invalidPacket',
      socket,
      payload: message,
    }
  };

  public static isPacketValid = (packet: Packet) => {
    if (!packet || !packet.type || !PACKET_TYPES.includes(packet.type)) {
      return false;
    }

    return true;
  }
}