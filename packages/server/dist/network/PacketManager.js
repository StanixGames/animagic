"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketManager = void 0;
const Packets_1 = require("./Packets");
class PacketManager {
}
exports.PacketManager = PacketManager;
PacketManager.parsePacket = (message, socket) => {
    const packet = JSON.parse(message);
    if (PacketManager.isPacketValid(packet)) {
        return Object.assign(Object.assign({}, packet), { socket });
    }
    return {
        type: 'invalidPacket',
        socket,
        payload: message,
    };
};
PacketManager.isPacketValid = (packet) => {
    if (!packet || !packet.type || !Packets_1.PACKET_TYPES.includes(packet.type)) {
        return false;
    }
    return true;
};
//# sourceMappingURL=PacketManager.js.map