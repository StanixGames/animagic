import { ServerClient } from '../ServerClient';

import { Packet } from './Packet';

export namespace ClientsStatePacket {
  export interface In extends Packet.In {
    type: 'CLIENTS_STATE';
    clients: Array<ServerClient>;
  }

  export interface Out extends Packet.Out {
    type: 'CLIENTS_STATE';
    clients: Array<{
      login: string;
      firstName: string;
      lastName: string;
    }>;
  }
}