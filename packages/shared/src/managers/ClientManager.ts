import { Client } from '../models';

export class ClientManager<CustomClient extends Client> {
  private clients: Map<string, CustomClient>;

  constructor() {
    this.clients = new Map<string, CustomClient>();
  }

  public add = (client: CustomClient): void => {
    const isDuplicated = !!this.clients.get(client.login);

    if (isDuplicated) {
      console.log(`Client with id ${client.login} is duplicated!`);
      this.clients.delete(client.login);
    }

    console.log('add client', client.login);

    this.clients.set(client.login, client);
  };

  public remove = (client: CustomClient): boolean => {
    console.log('remove client', client.login);

    return this.clients.delete(client.login);
  };

  public removeByLogin = (login: string): boolean => {
    return this.clients.delete(login);
  };

  public getByLogin = (login: string): CustomClient | undefined => {
    return this.clients.get(login);
  };

  public getByLoginWithBasicType = (login: string): Client | undefined => {
    if (!this.clients.has(login)) {
      return undefined;
    }

    const client = this.clients.get(login);

    if (!client) {
      return undefined;
    }

    const basicClient: Client = {
      login: client.login,
      firstName: client.firstName,
      lastName: client.lastName,
    };

    return basicClient;
  }

  public getAll = (): IterableIterator<CustomClient> => {
    return this.clients.values();
  }

  public getAllWithBasicType = (): Array<Client> => {
    const clients: Array<Client> = [];

    for (let item of this.clients.values()) {
      const { login, firstName, lastName } = item;

      const client: Client = {
        login,
        firstName,
        lastName,
      };
      clients.push(client);
    }

    return clients;
  }
}
