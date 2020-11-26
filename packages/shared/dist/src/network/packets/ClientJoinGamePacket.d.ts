import { Client } from '../../models';
import { Packet } from './Packet';
export declare type ClientJoinGamePacket = Packet & {
    type: 'CLIENT_JOIN_GAME';
    client: Client;
};
