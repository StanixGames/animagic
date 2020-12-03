import { Manager } from '../types';
import { Game } from '../Game';
import { World } from '../World';

export class WorldManager extends Manager {
  private scaling = 40;
  private session?: string;
  private world: World | null;

  constructor(game: Game) {
    super(game);

    this.world = null;
  }

  attachSession = (session: string) => {
    this.session = session;
  }

  init(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const client = this.game.networkManager.getClient();
      if (client) {
        const world = new World(client);
  
        try {
          await world.init({
            session: this.session,
          });
  
          this.world = world;

          return resolve();
        } catch (error) {
          console.log(error);
          reject(error);
        }
      }
    });
  }

  destroy(): Promise<void> {
    return new Promise(async (resolve) => {
      if (this.world) {
        this.world.destroy();
      }
      return resolve();
    });
  }

  update = (delta: number) => {

  }

  public toWorldDistance = (distance: number) => {
    return distance / this.scaling;
  }

  public updateScaling(scale: number) {
    this.scaling += scale;
    if (this.scaling < 10) {
      this.scaling = 10;
    } else if (this.scaling > 50) {
      this.scaling = 50;
    }
  }

  public getScaling = (): number => {
    return this.scaling;
  }
}