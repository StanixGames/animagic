import { GrindirLocationState } from './GrindirLocationState';
import { Location } from '../Location';

export class GrindirLocation extends Location<GrindirLocationState> {
  constructor() {
    super('grindir', GrindirLocationState);
  }
}
