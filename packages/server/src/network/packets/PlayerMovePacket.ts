import { Vector } from '../../utils';

import { Packet } from './Packet';

export namespace PlayerMovePacket {
  export interface In extends Packet.In {
    type: 'PLAYER_MOVE';
    velocity: Vector;
    time: number;
  }

  export interface Out extends Packet.Out {}
}