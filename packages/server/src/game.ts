import { World } from './world';
import { NetworkManager } from './network';

export class Game {
  private tickLengthMs = 1000 / 20;
  private previousTick = Date.now();

  private world: World;

  constructor() {
    this.world = new World();

    this.loop();
  }

  loop = () => {
    var now = Date.now()

    if (this.previousTick + this.tickLengthMs <= now) {
      var delta = (now - this.previousTick) / 1000;
      this.previousTick = now;

      this.update(delta);
    }

    if (Date.now() - this.previousTick < this.tickLengthMs - 16) {
      setTimeout(this.loop)
    } else {
      setImmediate(this.loop)
    }
  }

  update = (delta: number) => {
    NetworkManager.update(delta);
    this.world.update(delta);
  }

  destroy = () => {
    this.world.destroy();
  }
}