import * as PIXI from 'pixi.js';
import { Game } from '../Game';

import { AbstractRenderer } from './types';

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
    //
  }

  prepare(): void {
    this.entityLayer.clear();
    const worldScaling = this.game.worldManager.getScaling();
    this.entityLayer.scale.set(worldScaling, worldScaling);
  }
  
  render(): void {
    const cameraOffset = this.game.cameraManager.position;

    const { entities } = this.game.worldManager.world;
    const playerEntity = this.game.worldManager.getPlayerEntity();

    for (let entity of entities.values()) {
      const color = playerEntity && playerEntity.id === entity.id
        ? 0x00ffff
        : entity.color;

      this.entityLayer.beginFill(color, 1);
      this.entityLayer.drawRect(
        entity.position.x - entity.size.x / 2 - cameraOffset.x,
        entity.position.y - entity.size.y / 2 - cameraOffset.y,
        entity.size.x,
        entity.size.y,
      );
      this.entityLayer.endFill();
      this.entityLayer.closePath();
    }

    if (!playerEntity) {
      return;
    }

    // const localPlayerPos = this.game.playerManager.pos;

    // this.entityLayer.beginFill(0xeb0c40, 1);
    // this.entityLayer.drawRect(
    //   localPlayerPos.x - playerEntity.size.x / 2 - cameraOffset.x,
    //   localPlayerPos.y - playerEntity.size.y / 2 - cameraOffset.y,
    //   playerEntity.size.x,
    //   playerEntity.size.y,
    // );
    // this.entityLayer.endFill();
    // this.entityLayer.closePath();

    // this.entityLayer.lineStyle(1, 0xeb0c40);
    // this.entityLayer.moveTo(
    //   localPlayerPos.x - playerEntity.size.x / 2 - cameraOffset.x,
    //   localPlayerPos.y - playerEntity.size.y / 2 - cameraOffset.y,
    // );
    // this.entityLayer.lineTo(
    //   localPlayerPos.x + playerEntity.size.x / 2 - cameraOffset.x,
    //   localPlayerPos.y - playerEntity.size.y / 2 - cameraOffset.y,
    // );
    // this.entityLayer.lineTo(
    //   localPlayerPos.x + playerEntity.size.x / 2 - cameraOffset.x,
    //   localPlayerPos.y + playerEntity.size.y / 2 - cameraOffset.y,
    // );
    // this.entityLayer.lineTo(
    //   localPlayerPos.x - playerEntity.size.x / 2 - cameraOffset.x,
    //   localPlayerPos.y + playerEntity.size.y / 2 - cameraOffset.y,
    // );
    // this.entityLayer.lineTo(
    //   localPlayerPos.x - playerEntity.size.x / 2 - cameraOffset.x,
    //   localPlayerPos.y - playerEntity.size.y / 2 - cameraOffset.y,
    // );
    // this.entityLayer.closePath();
  }
}