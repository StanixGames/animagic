import { Game } from '../Game';

export default abstract class Renderer {
  protected game: Game;

  constructor(game: Game) {
    this.game = game;
  }
  
  abstract init(): void
  abstract resize(width: number, height: number): void;
  abstract prepare(): void;
  abstract render(): void;
  abstract destroy(): void;
}