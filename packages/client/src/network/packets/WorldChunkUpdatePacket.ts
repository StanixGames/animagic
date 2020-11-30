import { Chunk } from '../../World';

import { Packet } from './Packet';

export namespace WorldChunkUpdatePacket {
  export interface In extends Packet.In {
    type: 'WORLD_CHUNK_UPDATE';
    chunk: Chunk;
  }
}