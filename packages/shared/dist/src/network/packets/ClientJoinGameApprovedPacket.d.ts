import { Client } from '../../models';
import { Packet } from './Packet';
export declare type ClientJoinGameApprovedPacket = Packet & {
    type: 'CLIENT_JOIN_GAME_APPROVED';
    client: Client;
    playerEntityId: string;
};
