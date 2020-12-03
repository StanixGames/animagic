import { Manager } from '../types';
import { Game } from '../Game';

export class WorldManager extends Manager {
  private scaling = 40;

  constructor(game: Game) {
    super(game);
  }

  init(): Promise<void> {
    return Promise.resolve();
  }

  destroy(): Promise<void> {
    return Promise.resolve();
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