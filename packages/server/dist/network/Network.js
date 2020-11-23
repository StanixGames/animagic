"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Network = void 0;
const ws_1 = require("ws");
const shared_1 = require("@animagic/shared");
const PacketManager_1 = require("./PacketManager");
const PACKETS_PER_UPDATE = 20;
class Network {
    constructor(port) {
        this.update = (delta) => {
            let processedPackets = 0;
            while (processedPackets < PACKETS_PER_UPDATE) {
                if (this.packets.size() === 0) {
                    return;
                }
                const packet = this.packets.pop();
                // console.log('processing', packet)
                switch (packet.type) {
                    case 'invalidPacket': {
                        packet.socket.send(JSON.stringify(packet));
                        break;
                    }
                    case 'gameJoin': {
                        if (this.players.length > 0) {
                            this.players.forEach(player => {
                                packet.socket.send(JSON.stringify({
                                    type: 'gameJoin',
                                    payload: player,
                                }));
                            });
                        }
                        if (!this.players.find(p => p.playerId === packet.payload.playerId)) {
                            this.players.push({
                                playerId: packet.payload.playerId,
                                position: packet.payload.position,
                            });
                        }
                        packet.socket.send('Init data');
                        this.handleBroadcast(JSON.stringify({
                            type: 'gameJoin',
                            payload: packet.payload,
                        }));
                        break;
                    }
                    case 'playerMove': {
                        packet.socket.send('move player');
                        this.handleBroadcast(JSON.stringify({
                            type: 'playerMove',
                            payload: packet.payload,
                        }));
                        break;
                    }
                }
                processedPackets += 1;
            }
        };
        this.packets = new shared_1.Queue();
        this.players = [];
        this.ws = new ws_1.Server({
            port: parseInt(port, 10),
        });
        console.log('Started websocket on port ', port);
        this.ws.on('connection', (socket) => {
            this.handleConnection(socket);
        });
    }
    handleConnection(socket) {
        console.log('connected');
        socket.on('message', (message) => {
            try {
                const packet = PacketManager_1.PacketManager.parsePacket(message, socket);
                this.packets.push(packet);
            }
            catch (e) {
                console.error(e.message);
            }
        });
    }
    handleBroadcast(message) {
        this.ws.clients.forEach((client) => {
            client.send(message);
        });
    }
}
exports.Network = Network;
//# sourceMappingURL=Network.js.map