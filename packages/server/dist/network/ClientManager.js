"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientManager = void 0;
const clients = new Map();
class ClientManager {
}
exports.ClientManager = ClientManager;
ClientManager.add = (client) => {
    const isDuplicated = clients.has(client.login);
    if (isDuplicated) {
        console.log(`Client with id ${client.login} is duplicated!`);
        clients.delete(client.login);
    }
    console.log('add client', client.login);
    clients.set(client.login, client);
};
ClientManager.remove = (client) => {
    console.log('remove client', client.login);
    return clients.delete(client.login);
};
ClientManager.removeByLogin = (login) => {
    return clients.delete(login);
};
ClientManager.getByLogin = (login) => {
    return clients.get(login);
};
ClientManager.getAll = () => {
    return clients.values();
};
ClientManager.getAllAsArray = () => {
    const clientsArr = [];
    for (let client of clients.values()) {
        clientsArr.push(client);
    }
    return clientsArr;
};
//# sourceMappingURL=ClientManager.js.map