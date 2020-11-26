import { Game } from './Game';

export type ShapeAABB = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type Vector = {
  x: number;
  y: number;
};

export abstract class Manager {
  readonly game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  abstract init(): void;
  abstract destroy(): void;
}