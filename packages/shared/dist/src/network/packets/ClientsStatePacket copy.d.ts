import { Client } from '../../models';
import { Packet } from './Packet';
export declare type ClientsStatePacket = Packet & {
    type: 'CLIENTS_STATE';
    clients: Array<Client>;
};
