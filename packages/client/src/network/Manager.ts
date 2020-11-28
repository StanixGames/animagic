import { Game } from '../Game';

export abstract class Manager {
  readonly game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  abstract init(): Promise<void>;
  abstract destroy(): Promise<void>;
}