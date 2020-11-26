"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkManager = void 0;
const PacketManager_1 = require("./PacketManager");
const ClientManager_1 = require("./ClientManager");
class NetworkManager {
}
exports.NetworkManager = NetworkManager;
NetworkManager.handleConnection = (socket, session, login, firstName, lastName) => {
    const client = {
        session,
        socket,
        login,
        firstName,
        lastName,
    };
    ClientManager_1.ClientManager.add(client);
    const clientConnectedPacketIn = {
        type: 'CLIENT_CONNECTED',
        socket,
        client: ClientManager_1.ClientManager.getByLogin(client.login),
    };
    PacketManager_1.PacketManager.queuePacket(clientConnectedPacketIn);
    // broadcast all clients
    const clientsStatePacketIn = {
        type: 'CLIENTS_STATE',
        socket,
        clients: ClientManager_1.ClientManager.getAllAsArray(),
    };
    PacketManager_1.PacketManager.queuePacket(clientsStatePacketIn);
};
NetworkManager.handleDisconnection = () => {
    //
};
NetworkManager.update = (delta) => {
    PacketManager_1.PacketManager.update(delta);
};
//# sourceMappingURL=NetworkManager.js.map