import * as Colyseus from 'colyseus';

import { Manager } from './Manager';

import { GrindirLocation } from '../locations/GrindirLocation';
import { LocationState } from '../locations/LocationState';

export class LocationManager extends Manager {
  private locations: Map<string, Colyseus.Room<LocationState>>;

  constructor() {
    super();

    this.locations = new Map<string, Colyseus.Room<LocationState>>();
  }

  init(): Promise<void> {
    console.log('preparing locations...');

    const location = new GrindirLocation();
    this.locations.set(location.id, location);

    return Promise.resolve();
  }

  destroy(): Promise<void> {
    return Promise.resolve();
  }

  update(delta: number): void {
    // this.locations.forEach((location) => {
    //   console.log(location.state.entities)
    //   // console.log((location as WorldLocation).update(delta));
    //   // location.state.update(delta);
    // })
  }
}
