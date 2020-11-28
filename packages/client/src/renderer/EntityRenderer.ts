import * as PIXI from 'pixi.js';
import { Game } from '../Game';

import { AbstractRenderer } from './types';

export class EntityRenderer extends AbstractRenderer {
  private entityLayer: PIXI.Graphics;
  private playerWidth: number;
  private playerHeight: number;

  constructor(game: Game) {
    super(game);
    this.entityLayer = new PIXI.Graphics();
    this.entityLayer.width = window.innerWidth;
    this.entityLayer.height = window.innerHeight;
    this.playerWidth = window.innerHeight / 20;
    this.playerHeight = this.playerWidth * 1.6;
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
    this.playerWidth = height / 20;
    this.playerHeight = this.playerWidth * 1.6;
  }

  prepare(): void {
    this.entityLayer.clear();
    const worldScaling = this.game.worldManager.getScaling();
    this.entityLayer.scale.set(worldScaling, worldScaling);
  }
  
  render(): void {
    const cameraOffset = this.game.cameraManager.position;
    // this.entityLayer.beginFill(0x18de5a, 1);
    // this.entityLayer.drawRect(
    //   window.innerWidth / 2 - this.playerWidth / 2,
    //   window.innerHeight / 2 - this.playerHeight / 2,
    //   this.playerWidth,
    //   this.playerHeight,
    // );
    // this.entityLayer.endFill();
    // this.entityLayer.closePath();

    // const offset = this.game.playerManager.getPos();
    // const cameraOffsetX = window.innerWidth / 2 / this.; //offset.x;
    // const cameraOffsetY = window.innerHeight / 2; //offset.y;

    const { entities } = this.game.worldManager.world;

    for (let entity of entities.values()) {
      this.entityLayer.beginFill(entity.color, 1);
      this.entityLayer.drawRect(
        entity.position.x - entity.size.x / 2 + cameraOffset.x,
        entity.position.y - entity.size.y / 2 + cameraOffset.y,
        entity.size.x,
        entity.size.y,
      );
      this.entityLayer.endFill();
      this.entityLayer.closePath();
    }

    // entities.values().forEach((entity) => {
      
    // });
  }
}