import { Client } from '../../models';
import { Packet } from './Packet';
export declare type ClientJoinGameRequestPacket = Packet & {
    type: 'CLIENT_JOIN_GAME';
    client: Client;
};
