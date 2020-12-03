import { Game } from '../Game';

import { AbstractRenderer } from './AbstractRenderer';
import { WorldRenderer } from './WorldRenderer';
import { EntityRenderer } from './EntityRenderer';

export class Renderer extends AbstractRenderer {
  worldRenderer: WorldRenderer;
  entityRenderer: EntityRenderer;

  constructor(game: Game) {
    super(game);

    this.worldRenderer = new WorldRenderer(game);
    this.entityRenderer = new EntityRenderer(game);
  }

  init(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        await Promise.all([
          this.worldRenderer.init(),
          this.entityRenderer.init(),
        ]);
        resolve();
      } catch (error) {
        reject(error);
      }
    });  
  }

  destroy(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        await Promise.all([
          this.worldRenderer.destroy(),
          this.entityRenderer.destroy(),
        ]);
        resolve();
      } catch (error) {
        reject(error);
      }
    });  
  }

  resize(width: number, height: number): void {
    this.worldRenderer.resize(width, height);
    this.entityRenderer.resize(width, height);
  }

  prepare(): void {
    this.worldRenderer.prepare();
    this.entityRenderer.prepare();
  }

  render(): void {
    this.worldRenderer.render();
    this.entityRenderer.render();
  }
}