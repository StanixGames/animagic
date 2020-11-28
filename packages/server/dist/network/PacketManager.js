"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketManager = void 0;
const utils_1 = require("../utils");
const Game_1 = require("../Game");
const ClientManager_1 = require("./ClientManager");
const PACKETS_PER_UPDATE = 20;
const packets = new utils_1.Queue();
class PacketManager {
}
exports.PacketManager = PacketManager;
PacketManager.update = (delta) => {
    let processedPackets = 0;
    while (processedPackets < PACKETS_PER_UPDATE) {
        if (packets.size() === 0) {
            return;
        }
        const packet = packets.pop();
        console.log('processing', packet);
        switch (packet.type) {
            case 'PLAYER_JOIN':
                {
                    const typedPacket = packet;
                    const entity = Game_1.game.worldManager.getPlayerEntity(typedPacket.login);
                    if (!entity) {
                        console.error('INVALID PLAYER ENTITY INSTANCE');
                        break;
                    }
                    const packetOut = {
                        type: 'PLAYER_JOIN',
                        login: typedPacket.login,
                        entity,
                    };
                    const data = JSON.stringify(packetOut);
                    packet.socket.send(data);
                    break;
                }
                ;
            case 'CLIENTS_STATE':
                {
                    const typedPacket = packet;
                    const packetOut = {
                        type: 'CLIENTS_STATE',
                        clients: typedPacket.clients.map((client) => ({
                            login: client.login,
                            firstName: client.firstName,
                            lastName: client.lastName,
                        })),
                    };
                    const data = JSON.stringify(packetOut);
                    PacketManager.broadcast(data);
                }
                ;
            default: {
                const { socket } = packet;
                const packetOut = {
                    type: 'INVALID_PACKET',
                };
                const data = JSON.stringify(packetOut);
                socket.send(data);
            }
        }
        processedPackets += 1;
    }
};
PacketManager.queuePacket = (packet) => {
    packets.push(packet);
};
PacketManager.parsePacket = (message, socket) => {
    const data = JSON.parse(message);
    const packet = Object.assign({ socket }, data);
    if (!PacketManager.isPacketValid(packet)) {
        return null;
    }
    return packet;
};
PacketManager.isPacketValid = (packet) => {
    if (!packet || !packet.type) {
        return false;
    }
    return true;
};
PacketManager.broadcast = (data) => {
    for (let client of ClientManager_1.ClientManager.getAll()) {
        client.socket.send(data);
    }
};
//# sourceMappingURL=PacketManager.js.map