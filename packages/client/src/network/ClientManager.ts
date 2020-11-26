import { ConsumerClient } from './ConsumerClient';

const clients: Map<string, ConsumerClient> = new Map<string, ConsumerClient>();

export class ClientManager {

  public static add = (client: ConsumerClient): void => {
    const isDuplicated = clients.has(client.login);

    if (isDuplicated) {
      console.log(`Client with id ${client.login} is duplicated!`);
      clients.delete(client.login);
    }

    console.log('add client', client.login);

    clients.set(client.login, client);
  };

  public static remove = (client: ConsumerClient): boolean => {
    console.log('remove client', client.login);

    return clients.delete(client.login);
  };

  public static removeByLogin = (login: string): boolean => {
    return clients.delete(login);
  };

  public static getByLogin = (login: string): ConsumerClient | undefined => {
    return clients.get(login);
  };

  public static getAll = (): IterableIterator<ConsumerClient> => {
    return clients.values();
  }

  public static getAllAsArray = (): Array<ConsumerClient> => {
    const clientsArr: Array<ConsumerClient> = [];

    for (let client of clients.values()) {
      clientsArr.push(client);
    }

    return clientsArr;
  }
}
