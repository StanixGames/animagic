"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkManager = void 0;
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
    // const clientConnectedPacketIn: ClientConnectedPacket.In = {
    //   type: 'CLIENT_CONNECTED',
    //   socket,
    //   client: ClientManager.getByLogin(client.login),
    // };
    const playerJoinPacketIn = {
        type: 'PLAYER_JOIN',
        socket,
        login: client.login,
    };
    // PacketManager.queuePacket(playerJoinPacketIn);
    // broadcast all clients
    const clientsStatePacketIn = {
        type: 'CLIENTS_STATE',
        socket,
        login: client.login,
        clients: ClientManager_1.ClientManager.getAllAsArray(),
    };
    // PacketManager.queuePacket(clientsStatePacketIn);
};
NetworkManager.handleDisconnection = () => {
    //
};
NetworkManager.update = (delta) => {
    // PacketManager.update(delta);
    // console.log('delta', delta)
};
//# sourceMappingURL=NetworkManager.js.map