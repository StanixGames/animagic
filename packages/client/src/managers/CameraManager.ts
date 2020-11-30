import { Game } from '../Game';
import { Manager, Vector } from '../types';

const CAMERA_VELOCITY = 2;
const CAMERA_MIN_VELOCITY = 0.01;
const CAMERA_STICK = 0.01;

export class CameraManager extends Manager {
  readonly prevPosition: Vector;
  readonly position: Vector;
  readonly xOrigin: number;
  readonly yOrigin: number;

  private targetX: number;
  private targetY: number;

  constructor(game: Game) {
    super(game);

    this.xOrigin = -1 * game.worldManager.toWorldDistance(window.innerWidth / 2);
    this.yOrigin = -1 * game.worldManager.toWorldDistance(window.innerHeight / 2);

    this.position = {
      x: 0, // this.xOrigin,
      y: 0, // this.yOrigin,
    };
    this.prevPosition = {
      x: this.position.x,
      y: this.position.y,
    };

    this.targetX = this.position.x;
    this.targetY = this.position.y;
  }

  init(): Promise<void> { 
    return Promise.resolve();
  }
  
  destroy(): Promise<void> {
    return Promise.resolve();
  }

  moveCamera = (deltaX: number, deltaY: number): void => {
    this.targetX = this.position.x + deltaX;
    this.targetY = this.position.y + deltaY;
  }

  setCamera = (x: number, y: number) => {
    this.targetX = x;
    this.targetY = y;
  }

  update = (delta: number) => {
    const playerEntity = this.game.worldManager.getPlayerEntity();

    if (!playerEntity) {
      return;
    }

    this.setCamera(
      playerEntity.position.x + this.xOrigin,
      playerEntity.position.y + this.yOrigin,
    );
  }

  render = (delta: number) => {
    if (this.targetX !== this.position.x || this.targetY !== this.position.y) {
      this.prevPosition.x = this.position.x;
      this.prevPosition.y = this.position.y;

      const dx = this.targetX - this.position.x;
      const dy = this.targetY - this.position.y;

      let velX = Math.abs(dx * delta * CAMERA_VELOCITY);
      let velY = Math.abs(dy * delta * CAMERA_VELOCITY);

      velX = velX < CAMERA_MIN_VELOCITY ? CAMERA_MIN_VELOCITY : velX;
      velY = velY < CAMERA_MIN_VELOCITY ? CAMERA_MIN_VELOCITY : velY;

      if (dx < 0) {
        velX *= -1;
      }
      if (dy < 0) {
        velY *= -1;
      }

      this.position.x += velX;
      this.position.y += velY;

      if (Math.abs(dx) < CAMERA_STICK) {
        this.position.x = this.targetX;
      }
      if (Math.abs(dy) < CAMERA_STICK) {
        this.position.y = this.targetY;
      }
    }
  }
}
