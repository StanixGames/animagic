import { ServerClient } from '../ServerClient';
import { Packet } from './Packet';
export declare namespace ClientsStatePacket {
    interface In extends Packet.In {
        type: 'CLIENTS_STATE';
        clients: Array<ServerClient>;
    }
    interface Out extends Packet.Out {
        type: 'CLIENTS_STATE';
        clients: Array<{
            login: string;
            firstName: string;
            lastName: string;
        }>;
    }
}
