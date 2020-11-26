import { Vector } from '../../types';
import { Packet } from './Packet';
export declare type PlayerMovePacket = Packet & {
    type: 'PLAYER_MOVE';
    velocity: Vector;
};
