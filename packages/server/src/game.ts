import { Player } from './models/Player';
import { World } from './world';
import { Network } from './network';

export class Game {
  private tickLengthMs = 1000 / 20;
  private previousTick = Date.now();
  // private actualTicks = 0;

  private network: Network;
  private world: World;
  private players: Map<string, Player>;

  constructor(port: string) {
    this.network = new Network(port);
    this.world = new World();
    this.players = new Map();

    this.loop();
  }

  loop = () => {
    var now = Date.now()
    // this.actualTicks += 1;

    if (this.previousTick + this.tickLengthMs <= now) {
      var delta = (now - this.previousTick) / 1000;
      this.previousTick = now;

      this.update(delta);

      // console.log('delta', delta, '(target: ' + this.tickLengthMs + ' ms)', 'node ticks', this.actualTicks)
      // this.actualTicks = 0;
    }

    if (Date.now() - this.previousTick < this.tickLengthMs - 16) {
      setTimeout(this.loop)
    } else {
      setImmediate(this.loop)
    }
  }

  update = (delta: number) => {
    this.world.update(delta);
    this.network.update(delta);
  }
}