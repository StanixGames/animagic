import * as Colyseus from 'colyseus.js';

import { GrindirLocationState } from './GrindirLocationState';
import { Location } from '../Location';

export class GrindirLocation extends Location<GrindirLocationState> {
  constructor(client: Colyseus.Client) {
    super('grindir', client);
  }
}
