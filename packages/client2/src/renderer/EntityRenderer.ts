import * as PIXI from 'pixi.js';
import { Game } from '../Game';

import Renderer from './types';

export class EntityRenderer extends Renderer {
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

  init() {
    this.game.app.stage.addChild(this.entityLayer);
  }

  resize = (width: number, height: number): void => {
    this.playerWidth = height / 20;
    this.playerHeight = this.playerWidth * 1.6;
  }

  destroy() {
    this.game.app.stage.removeChild(this.entityLayer);
  }

  prepare(): void {
    this.entityLayer.clear();
    const worldScaling = this.game.worldManager.getScaling();
    this.entityLayer.scale.set(worldScaling, worldScaling);
  }
  
  render(): void {
    this.entityLayer.beginFill(0x18de5a, 1);
    this.entityLayer.drawRect(
      window.innerWidth / 2 - this.playerWidth / 2,
      window.innerHeight / 2 - this.playerHeight / 2,
      this.playerWidth,
      this.playerHeight,
    );
    this.entityLayer.endFill();
    this.entityLayer.closePath();

    const offset = this.game.playerManager.getPos();
    const CAMERA_OFFSET_X = offset.x;
    const CAMERA_OFFSET_Y = offset.y;

    const players = this.game.playerManager.getPlayers();

    players.forEach(player => {
      this.entityLayer.beginFill(0xFFFFFF, 1);
      this.entityLayer.drawRect(
        player.position.x - CAMERA_OFFSET_X + window.innerWidth / 2 - this.playerWidth / 2,
        player.position.y - CAMERA_OFFSET_Y + window.innerHeight / 2 - this.playerHeight / 2,
        this.playerWidth,
        this.playerHeight,
      );
      this.entityLayer.endFill();
      this.entityLayer.closePath();
    });
  }
}