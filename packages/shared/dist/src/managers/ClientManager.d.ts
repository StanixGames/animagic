import { Client } from '../models';
export declare class ClientManager<CustomClient extends Client> {
    private clients;
    constructor();
    add: (client: CustomClient) => void;
    remove: (client: CustomClient) => boolean;
    removeByLogin: (login: string) => boolean;
    getByLogin: (login: string) => CustomClient | undefined;
    getByLoginWithBasicType: (login: string) => Client | undefined;
    getAll: () => IterableIterator<CustomClient>;
    getAllWithBasicType: () => Array<Client>;
}
