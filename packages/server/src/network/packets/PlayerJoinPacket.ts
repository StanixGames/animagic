import { Entity } from '../../world';

import { Packet } from './Packet';

export namespace PlayerJoinPacket {
  export interface In extends Packet.In {
    type: 'PLAYER_JOIN';
    login: string;
  }

  export interface Out extends Packet.Out {
    type: 'PLAYER_JOIN';
    login: string;
    entity: Entity;
  }
}