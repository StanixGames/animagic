import { ServerClient } from './ServerClient';

const clients: Map<string, ServerClient> = new Map<string, ServerClient>();

export class ClientManager {

  public static add = (client: ServerClient): void => {
    const isDuplicated = clients.has(client.login);

    if (isDuplicated) {
      console.log(`Client with id ${client.login} is duplicated!`);
      clients.delete(client.login);
    }

    console.log('add client', client.login);

    clients.set(client.login, client);
  };

  public static remove = (client: ServerClient): boolean => {
    console.log('remove client', client.login);

    return clients.delete(client.login);
  };

  public static removeByLogin = (login: string): boolean => {
    return clients.delete(login);
  };

  public static getByLogin = (login: string): ServerClient | undefined => {
    return clients.get(login);
  };

  public static getAll = (): IterableIterator<ServerClient> => {
    return clients.values();
  }

  public static getAllAsArray = (): Array<ServerClient> => {
    const clientsArr: Array<ServerClient> = [];

    for (let client of clients.values()) {
      clientsArr.push(client);
    }

    return clientsArr;
  }
}
