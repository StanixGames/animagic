import { Vector } from '../types';

import { Client } from './Client';

export type Player = {
  client: Client;
  position: Vector;
  velocity: Vector;
  color: string;
};
