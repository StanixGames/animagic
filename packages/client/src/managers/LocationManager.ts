import { Game } from '../Game';
import { Manager } from '../types';
import { Location } from '../locations/Location';
import { GrindirLocation } from '../locations';

export class LocationManager extends Manager {
  private location?: Location<any>;
  private session?: string;

  constructor(game: Game) {
    super(game);
  }

  attachSession = (session: string) => {
    this.session = session;
  }

  init(): Promise<void> { 
    return Promise.resolve();
  }
  
  destroy(): Promise<void> {
    return Promise.resolve();
  }

  joinGrindir = async () => {
    this.leaveCurrentLocation();

    const client = this.game.networkManager.getClient();
    if (client) {
      const location = new GrindirLocation(client);

      try {
        await location.init({
          session: this.session,
        });

        this.location = location;

      } catch (error) {
        console.log(error);
      }
    }
  }

  public getCurrentLocation = (): Location<any> | undefined => {
    return this.location;
  }

  public leaveCurrentLocation = () => {
    if (this.location) {
      this.location.destroy();
    }
  }
}
