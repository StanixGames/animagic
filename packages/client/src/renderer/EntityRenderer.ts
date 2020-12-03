import * as PIXI from 'pixi.js';
import { Game } from '../Game';

import { AbstractRenderer } from './AbstractRenderer';

export class EntityRenderer extends AbstractRenderer {
  private entityLayer: PIXI.Graphics;

  constructor(game: Game) {
    super(game);
    this.entityLayer = new PIXI.Graphics();
    this.entityLayer.width = window.innerWidth;
    this.entityLayer.height = window.innerHeight;
  }

  init(): Promise<void> {
    this.game.app.stage.addChild(this.entityLayer);
    
    return Promise.resolve();
  }

  destroy(): Promise<void> {
    this.game.app.stage.removeChild(this.entityLayer);

    return Promise.resolve();
  }

  resize = (width: number, height: number): void => {
    this.entityLayer.width = width;
    this.entityLayer.height = height;
  }

  prepare(): void {
    this.entityLayer.clear();
    const worldScaling = this.game.worldManager.getScaling();
    this.entityLayer.scale.set(worldScaling, worldScaling);
  }
  
  render(): void {
    const cameraOffset = this.game.cameraManager.position;
    
    const location = this.game.locationManager.getCurrentLocation();

    if (!location) {
      return;
    }

    const entities = location.getEntities();

    entities?.forEach((entity) => {
      const color = entity.color;

      this.entityLayer.beginFill(color, 1);
      this.entityLayer.drawRect(
        entity.x - entity.width / 2 - cameraOffset.x,
        entity.y - entity.height / 2 - cameraOffset.y,
        entity.width,
        entity.height,
      );
      this.entityLayer.endFill();
      this.entityLayer.closePath();
    });
  }
}