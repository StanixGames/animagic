import { Game } from '../Game';
import { Manager, Vector } from '../types';

export class CameraManager extends Manager {
  readonly position: Vector;

  constructor(game: Game) {
    super(game);
    this.position = {
      x: 0,
      y: 0,
    };
  }

  init(): Promise<void> { 
    return Promise.resolve();
  }
  
  destroy(): Promise<void> {
    return Promise.resolve();
  }

  moveCamera = (deltaX: number, deltaY: number): void => {
    this.position.x += deltaX;
    this.position.y += deltaY;
  }
}
