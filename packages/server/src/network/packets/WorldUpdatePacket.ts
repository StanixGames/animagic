import { Entity } from '../../world';

import { Packet } from './Packet';

export namespace WorldUpdatePacket {
  export interface Out extends Packet.Out {
    type: 'WORLD_UPDATE';
    entities: Array<Entity>;
  }
}