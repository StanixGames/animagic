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
            break;
        }
        const packet = packets.pop();
        // console.log('processing', packet)
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
                    packet.socket.send(JSON.stringify(packetOut));
                    // send entities
                    const worldUpdatePacketOut = {
                        type: 'WORLD_UPDATE',
                        entities: Game_1.game.worldManager.getEntitiesAsArray(),
                    };
                    packet.socket.send(JSON.stringify(worldUpdatePacketOut));
                    // send chunks
                    const chunks = Game_1.game.worldManager.getChunksInRadius(Math.floor(entity.position.x / 8), Math.floor(entity.position.y / 8));
                    chunks.forEach((chunk) => {
                        const worldUpdateChunkPacketOut = {
                            type: 'WORLD_CHUNK_UPDATE',
                            chunk
                        };
                        packet.socket.send(JSON.stringify(worldUpdateChunkPacketOut));
                    });
                    break;
                }
                ;
            case 'PLAYER_MOVE': {
                const typedPacket = packet;
                // console.log('player move', typedPacket.velocity, typedPacket.login);
                const entity = Game_1.game.worldManager.getPlayerEntity(typedPacket.login);
                if (!entity) {
                    console.error('INVALID PLAYER ENTITY INSTANCE');
                    break;
                }
                Game_1.game.worldManager.moveEntity(entity.id, typedPacket.velocity);
                break;
            }
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
        ///// UPdate state
    }
    // send entities
    const worldUpdatePacketOut = {
        type: 'WORLD_UPDATE',
        entities: Game_1.game.worldManager.getEntitiesAsArray(),
    };
    PacketManager.broadcast(JSON.stringify(worldUpdatePacketOut));
};
PacketManager.queuePacket = (packet) => {
    packets.push(packet);
};
PacketManager.parsePacket = (message, socket, login) => {
    const data = JSON.parse(message);
    const packet = Object.assign({ socket,
        login }, data);
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