import { Game } from '../Game';

export abstract class AbstractRenderer {
  protected game: Game;

  constructor(game: Game) {
    this.game = game;
  }
  
  abstract init(): Promise<void>
  abstract destroy(): Promise<void>;
  abstract resize(width: number, height: number): void;
  abstract prepare(): void;
  abstract render(): void;
}