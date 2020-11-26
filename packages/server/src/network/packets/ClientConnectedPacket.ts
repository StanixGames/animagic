import { ServerClient } from '../ServerClient';

import { Packet } from './Packet';

export namespace ClientConnectedPacket {
  export interface In extends Packet.In {
    type: 'CLIENT_CONNECTED';
    client: ServerClient;
  }

  export interface Out extends Packet.Out {
    type: 'CLIENT_CONNECTED';
    client: {
      login: string;
      firstName: string;
      lastName: string;
    };
  }
}