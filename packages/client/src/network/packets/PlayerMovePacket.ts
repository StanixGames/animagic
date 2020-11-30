import { Vector } from '../../types';

import { Packet } from './Packet';

export namespace PlayerMovePacket {
  export interface In extends Packet.In {}
  
  export interface Out extends Packet.Out {
    type: 'PLAYER_MOVE';
    velocity: Vector;
    time: number;
  }
}