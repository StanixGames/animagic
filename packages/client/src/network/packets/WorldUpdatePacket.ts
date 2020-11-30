import { Entity } from '../../World';

import { Packet } from './Packet';

export namespace WorldUpdatePacket {
  export interface In extends Packet.Out {
    type: 'WORLD_UPDATE';
    entities: Array<Entity>;
  }
}