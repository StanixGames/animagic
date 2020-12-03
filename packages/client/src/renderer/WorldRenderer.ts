import * as PIXI from 'pixi.js';

import { Game } from '../Game';
import { Tile } from '../models';

import { AbstractRenderer } from './AbstractRenderer';

export class WorldRenderer extends AbstractRenderer {
  private worldLayer: PIXI.Graphics;
  private outterClipMask: PIXI.Graphics;

  constructor(game: Game) {
    super(game);
    this.worldLayer = new PIXI.Graphics();
    this.worldLayer.width = window.innerWidth;
    this.worldLayer.height = window.innerHeight;

    this.outterClipMask = new PIXI.Graphics();
    this.outterClipMask.drawRect(0, 0, window.innerWidth, window.innerHeight);
    this.outterClipMask.renderable = true;
    this.outterClipMask.cacheAsBitmap = true;
  }

  init(): Promise<void> {
    this.game.app.stage.addChild(this.worldLayer);
    this.game.app.stage.addChild(this.outterClipMask);
    this.game.app.stage.mask = this.outterClipMask;

    return Promise.resolve();
  }

  destroy(): Promise<void> {
    this.game.app.stage.removeChild(this.worldLayer);
    this.game.app.stage.removeChild(this.outterClipMask);

    return Promise.resolve();
  }

  resize = (width: number, height: number): void => {
    this.worldLayer.width = width;
    this.worldLayer.height = height;

    this.outterClipMask.clear();
    this.outterClipMask.drawRect(0, 0, width, height);
  }

  prepare(): void {
    this.worldLayer.clear();
    const worldScaling = this.game.worldManager.getScaling();
    this.worldLayer.scale.set(worldScaling, worldScaling);
  }
  
  render(): void {
    const cameraOffset = this.game.cameraManager.position;

    const location = this.game.locationManager.getCurrentLocation();

    if (!location) {
      return;
    }

    const tiles = location.getTiles();

    tiles?.forEach((tile) => {
      let color = 0x5e5e5e;

      if (tile.type === Tile.Type.DIRT) {
        color = 0x78512a;
      } else if (tile.type === Tile.Type.GRASS) {
        color = 0x537018;
      } else if (tile.type === Tile.Type.SAND) {
        color = 0xd4d19f;
      }

      this.worldLayer.beginFill(color, 1);
      this.worldLayer.drawRect(
        tile.x - 0.5 - cameraOffset.x,
        tile.y - 0.5 - cameraOffset.y,
        1,
        1
      );
      this.worldLayer.endFill();
      this.worldLayer.closePath();
    });

    const bounds = location.getBounds();
    
    if (bounds) {
      this.worldLayer.lineStyle(0.1, 0xe84509);
      this.worldLayer.moveTo(bounds.minX - 0.5 - cameraOffset.x, bounds.minY - 0.5 - cameraOffset.y);
      this.worldLayer.lineTo(bounds.maxX - 0.5 - cameraOffset.x, bounds.minY - 0.5 - cameraOffset.y);
      this.worldLayer.lineTo(bounds.maxX - 0.5 - cameraOffset.x, bounds.maxY - 0.5 - cameraOffset.y);
      this.worldLayer.lineTo(bounds.minX - 0.5 - cameraOffset.x, bounds.maxY - 0.5 - cameraOffset.y);
      this.worldLayer.lineTo(bounds.minX - 0.5 - cameraOffset.x, bounds.minY - 0.5 - cameraOffset.y);
      this.worldLayer.closePath();
    }
  }
}