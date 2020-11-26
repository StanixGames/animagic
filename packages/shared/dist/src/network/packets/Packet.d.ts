import WebSocket from 'ws';
declare type PacketType = 'CLIENT_CONNECTED' | 'CLIENTS_STATE' | 'INVALID_PACKET';
export declare namespace Packet {
    interface In {
        type: PacketType;
        socket: WebSocket;
    }
    interface Out {
        type: PacketType;
    }
}
export {};
