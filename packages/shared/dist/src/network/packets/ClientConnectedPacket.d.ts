import { ServerClient } from '../ServerClient';
import { Packet } from './Packet';
export declare namespace ClientConnectedPacket {
    interface In extends Packet.In {
        type: 'CLIENT_CONNECTED';
        client: ServerClient;
    }
    interface Out extends Packet.Out {
        type: 'CLIENT_CONNECTED';
        client: {
            login: string;
            firstName: string;
            lastName: string;
        };
    }
}
