"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientManager = void 0;
class ClientManager {
    constructor() {
        this.add = (client) => {
            const isDuplicated = !!this.clients.get(client.login);
            if (isDuplicated) {
                console.log(`Client with id ${client.login} is duplicated!`);
                this.clients.delete(client.login);
            }
            console.log('add client', client.login);
            this.clients.set(client.login, client);
        };
        this.remove = (client) => {
            console.log('remove client', client.login);
            return this.clients.delete(client.login);
        };
        this.removeByLogin = (login) => {
            return this.clients.delete(login);
        };
        this.getByLogin = (login) => {
            return this.clients.get(login);
        };
        this.getByLoginWithBasicType = (login) => {
            if (!this.clients.has(login)) {
                return undefined;
            }
            const client = this.clients.get(login);
            if (!client) {
                return undefined;
            }
            const basicClient = {
                login: client.login,
                firstName: client.firstName,
                lastName: client.lastName,
            };
            return basicClient;
        };
        this.getAll = () => {
            return this.clients.values();
        };
        this.getAllWithBasicType = () => {
            const clients = [];
            for (let item of this.clients.values()) {
                const { login, firstName, lastName } = item;
                const client = {
                    login,
                    firstName,
                    lastName,
                };
                clients.push(client);
            }
            return clients;
        };
        this.clients = new Map();
    }
}
exports.ClientManager = ClientManager;
//# sourceMappingURL=ClientManager.js.map