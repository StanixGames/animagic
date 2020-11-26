"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Network = void 0;
const ws_1 = require("ws");
const shared_1 = require("@animagic/shared");
const shared_2 = require("@animagic/shared");
const PacketManager_1 = require("./PacketManager");
const PACKETS_PER_UPDATE = 20;
const createClient = (login, socket) => {
    const newClientId = `${Math.random().toFixed(3)}.${Math.random().toFixed(3)}`;
    return {
        id: newClientId,
        socket,
    };
};
class Network {
    constructor(port) {
        this.update = (delta) => {
            let processedPackets = 0;
            while (processedPackets < PACKETS_PER_UPDATE) {
                if (this.packets.size() === 0) {
                    return;
                }
                const packet = this.packets.pop();
                console.log('processing', packet);
                switch (packet.type) {
                    case 'CLIENT_CONNECTED_RESPONSE':
                        {
                            const packetConnect = packet;
                            const client = this.clientManager.getById(packetConnect.client.id);
                            const data = JSON.stringify(packetConnect);
                            client.socket.send(data);
                            break;
                        }
                        ;
                    case 'CLIENTS_STATE':
                        {
                            const data = JSON.stringify(packet);
                            this.handleBroadcast(data);
                        }
                        ;
                    // case 'CLIENT_DISCONNECTED': {
                    //   const data = JSON.stringify(packet);
                    //   this.handleBroadcast(data);
                    // }
                    // case 'CLIENT_JOIN_GAME_REQUEST': {
                    //   const playerEntityId = 'entity12345';
                    //   const packetReq = packet as ClientConnectedPacket;
                    //   const serverClient = packetReq.client as ServerClient;
                    //   const resPacket: ClientJoinGameApprovedPacket = {
                    //     type: 'CLIENT_JOIN_GAME_APPROVED',
                    //     client: {
                    //       id: packetReq.client.id
                    //     },
                    //     playerEntityId,
                    //   };
                    //   const data = JSON.stringify(resPacket);
                    //   serverClient.socket.send(data);
                    // }
                }
                processedPackets += 1;
            }
        };
        this.handleConnection = (socket) => {
            const client = createClient('test', socket);
            this.clientManager.add(client);
            const packetConnect = {
                type: 'CLIENT_CONNECTED_RESPONSE',
                client: this.clientManager.getByIdWithBasicType(client.id),
            };
            this.packets.push(packetConnect);
            // broadcast all clients
            const clients = this.clientManager.getAllWithBasicType();
            const packetClientsState = {
                type: 'CLIENTS_STATE',
                clients,
            };
            this.packets.push(packetClientsState);
            socket.on('message', (message) => {
                console.log(message);
                try {
                    const packet = PacketManager_1.PacketManager.parsePacket(message);
                    if (!packet) {
                        console.log('Invalid Packet!', message);
                        return;
                    }
                    this.packets.push(packet);
                }
                catch (e) {
                    console.error(e.message);
                }
            });
        };
        this.handleDisconnection = (socket) => {
            console.log('someone disconnected');
        };
        this.clientManager = new shared_2.ClientManager();
        this.packets = new shared_1.Queue();
        this.ws = new ws_1.Server({
            port: parseInt(port, 10),
        });
        console.log('Started websocket on port ', port);
        this.ws.on('connection', this.handleConnection);
        this.ws.on('close', this.handleDisconnection);
    }
    handleBroadcast(message) {
        this.ws.clients.forEach((client) => {
            client.send(message);
        });
    }
}
exports.Network = Network;
//# sourceMappingURL=Network%20copy.js.map