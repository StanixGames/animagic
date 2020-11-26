import * as PIXI from 'pixi.js';
import { Game } from '../Game';
import { CHUNK_SIZE } from '../World';
import { ShapeAABB } from '../types';
import { checkCollisionAABB } from '../utils/Geometry';

import Renderer from './types';

const ACTIVE_CHUNKS_SIZE = 10;

export class WorldRenderer extends Renderer {
  private worldLayer: PIXI.Graphics;
  private outterClipMask: PIXI.Graphics;
  private viewClipArea: ShapeAABB;
  private blockSize: number;

  constructor(game: Game) {
    super(game);
    this.worldLayer = new PIXI.Graphics();
    this.worldLayer.width = window.innerWidth;
    this.worldLayer.height = window.innerHeight;

    this.outterClipMask = new PIXI.Graphics();
    this.outterClipMask.drawRect(0, 0, window.innerWidth, window.innerHeight);
    this.outterClipMask.renderable = true;
    this.outterClipMask.cacheAsBitmap = true;

    this.viewClipArea = {
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.blockSize = window.innerHeight / 40;
  }

  init() {
    this.game.app.stage.addChild(this.worldLayer);
    this.game.app.stage.addChild(this.outterClipMask);
    this.game.app.stage.mask = this.outterClipMask;
  }

  resize = (width: number, height: number): void => {
    this.worldLayer.width = width;
    this.worldLayer.height = height;

    this.viewClipArea = {
      x: 0,
      y: 0,
      width,
      height,
    };

    this.outterClipMask.clear();
    this.outterClipMask.drawRect(0, 0, width, height);

    this.blockSize = height / 40;
  }

  destroy() {
    this.game.app.stage.removeChild(this.worldLayer);
    this.game.app.stage.removeChild(this.outterClipMask);
  }

  prepare(): void {
    this.worldLayer.clear();
    const worldScaling = this.game.worldManager.getScaling();
    this.worldLayer.scale.set(worldScaling, worldScaling);
  }
  
  render(): void {
    const offset = this.game.playerManager.getPos();
    const CAMERA_OFFSET_X = offset.x;
    const CAMERA_OFFSET_Y = offset.y;

    this.worldLayer.lineStyle(5, 0xffffff);
    this.worldLayer.moveTo(0, 0);
    this.worldLayer.lineTo(this.worldLayer.width, 0);
    this.worldLayer.lineTo(this.worldLayer.width, this.worldLayer.height);
    this.worldLayer.lineTo(0, this.worldLayer.height);
    this.worldLayer.lineTo(0, 0);
    this.worldLayer.closePath();

    const CHUNK_TILES_SIZE = CHUNK_SIZE * this.blockSize;
    
    const CAMERA_CHUNK_POS_X = Math.floor(CAMERA_OFFSET_X / CHUNK_TILES_SIZE);
    const CAMERA_CHUNK_POS_Y = Math.floor(CAMERA_OFFSET_Y / CHUNK_TILES_SIZE);

    for (let x = CAMERA_CHUNK_POS_X - ACTIVE_CHUNKS_SIZE / 2; x < CAMERA_CHUNK_POS_X + ACTIVE_CHUNKS_SIZE / 2; x += 1) {
      for (let y = CAMERA_CHUNK_POS_Y - ACTIVE_CHUNKS_SIZE / 2; y < CAMERA_CHUNK_POS_Y + ACTIVE_CHUNKS_SIZE / 2; y += 1) {
        
        const CHUNK_X = x * CHUNK_TILES_SIZE - CAMERA_OFFSET_X + window.innerWidth / 2;
        const CHUNK_Y = y * CHUNK_TILES_SIZE - CAMERA_OFFSET_Y + window.innerHeight / 2;

        const isActiveChunk = checkCollisionAABB({
          x: CHUNK_X,
          y: CHUNK_Y,
          width: CHUNK_TILES_SIZE,
          height: CHUNK_TILES_SIZE,
        }, this.viewClipArea);

        if (!isActiveChunk) {
          continue;
        }

          const chunk = this.game.worldManager.getChunkAt(x, y);

          if (!chunk) {
            continue;
          }

          const tiles = chunk.getTiles();
    
          this.worldLayer.lineStyle(0, 0xffffff);
          tiles.forEach((tile) => {

            const x = CHUNK_X + tile.x * this.blockSize;
            const y = CHUNK_Y + tile.y * this.blockSize;

            const isInViewArea = checkCollisionAABB({
              x,
              y,
              width: this.blockSize,
              height: this.blockSize,
            }, this.viewClipArea);

            if (isInViewArea) {
              this.worldLayer.beginFill(tile.material === 'grass' ? 0x1a590d : 0x9e9e7d, 0.6);
              this.worldLayer.drawRect(x, y, this.blockSize, this.blockSize);
              this.worldLayer.endFill();
              this.worldLayer.closePath();
            }
          });
    
          this.worldLayer.lineStyle(1, isActiveChunk ? 0x00FFFF : 0xFF0000);
          this.worldLayer.moveTo(CHUNK_X, CHUNK_Y);
          this.worldLayer.lineTo(CHUNK_X + CHUNK_TILES_SIZE, CHUNK_Y);
          this.worldLayer.lineTo(CHUNK_X + CHUNK_TILES_SIZE, CHUNK_Y + CHUNK_TILES_SIZE);
          this.worldLayer.lineTo(CHUNK_X, CHUNK_Y + CHUNK_TILES_SIZE);
          this.worldLayer.lineTo(CHUNK_X, CHUNK_Y);
          this.worldLayer.closePath();

        }
      }
      
      this.worldLayer.lineStyle(5, 0xFF00FF);
      this.worldLayer.moveTo(this.viewClipArea.x, this.viewClipArea.y);
      this.worldLayer.lineTo(this.viewClipArea.x + this.viewClipArea.width, this.viewClipArea.y);
      this.worldLayer.lineTo(this.viewClipArea.x + this.viewClipArea.width, this.viewClipArea.y + this.viewClipArea.height);
      this.worldLayer.lineTo(this.viewClipArea.x, this.viewClipArea.y + this.viewClipArea.height);
      this.worldLayer.lineTo(this.viewClipArea.x, this.viewClipArea.y);
      this.worldLayer.closePath();
  }
}