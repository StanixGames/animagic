import { Entity } from '../../World';

import { Packet } from './Packet';

export namespace PlayerJoinPacket {
  export interface In extends Packet.In {
    type: 'PLAYER_JOIN';
    login: string;
    entity: Entity;
  }

  export interface Out extends Packet.Out {}
}