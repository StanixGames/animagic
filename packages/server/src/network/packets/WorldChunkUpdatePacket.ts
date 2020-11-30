import { Chunk } from '../../world';

import { Packet } from './Packet';

export namespace WorldChunkUpdatePacket {
  export interface Out extends Packet.Out {
    type: 'WORLD_CHUNK_UPDATE';
    chunk: Chunk;
  }
}