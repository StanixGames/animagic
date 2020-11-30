import { Game } from '../Game';
import { Manager, Vector } from '../types';
import { Player } from './types';
import { PlayerMovePacket } from '../network/packets';
import { PacketManager } from '../network';

const VELOCITY_SPEED = 0.2;
const MAX_SPEED = 1;

export class PlayerManager extends Manager {
  private prevVelocity: Vector;
  private velocity: Vector;
  readonly pos: Vector;
  private speed: number;
  private players: Array<Player>;
  private playerId: string;

  constructor(game: Game, playerId: string) {
    super(game);

    this.playerId = playerId;
    this.players = [];

    this.pos = {
      x: 0,
      y: 0,
    };
    this.prevVelocity = {
      x: 0,
      y: 0,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.speed = 0;
  }

  init(): Promise<void> {
    return Promise.resolve();
  }
  
  destroy(): Promise<void> {
    return Promise.resolve();
  }

  update = (delta: number): void => {
    // console.log('Update >', delta)
    this.prevVelocity.x = this.velocity.x;
    this.prevVelocity.y = this.velocity.y;

    if (this.game.inputManager.isMoveRightPressed) {
      this.velocity.x += VELOCITY_SPEED;
      if (this.velocity.x > MAX_SPEED) {
        this.velocity.x = MAX_SPEED;
      }
    } else if (this.game.inputManager.isMoveLeftPressed) {
      this.velocity.x -= VELOCITY_SPEED;
      if (this.velocity.x < -MAX_SPEED) {
        this.velocity.x = -MAX_SPEED;
      }
    } else {
      if (this.velocity.x > 0) {
        this.velocity.x -= VELOCITY_SPEED;
        if (this.velocity.x < 0) {
          this.velocity.x = 0;
        }
      }
      if (this.velocity.x < 0) {
        this.velocity.x += VELOCITY_SPEED;
        if (this.velocity.x > 0) {
          this.velocity.x = 0;
        }
      }
    }

    if (this.game.inputManager.isMoveDownPressed) {
      this.velocity.y += VELOCITY_SPEED;
      if (this.velocity.y > MAX_SPEED) {
        this.velocity.y = MAX_SPEED;
      }
    } else if (this.game.inputManager.isMoveUpPressed) {
      this.velocity.y -= VELOCITY_SPEED;
      if (this.velocity.y < -MAX_SPEED) {
        this.velocity.y = -MAX_SPEED;
      }
    } else {
      if (this.velocity.y > 0) {
        this.velocity.y -= VELOCITY_SPEED;
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
        }
      }
      if (this.velocity.y < 0) {
        this.velocity.y += VELOCITY_SPEED;
        if (this.velocity.y > 0) {
          this.velocity.y = 0;
        }
      }
    }

    if (this.velocity.x !== 0) {
      this.pos.x += this.velocity.x;
    }
    if (this.velocity.y !== 0) {
      this.pos.y += this.velocity.y;
    }

    if (this.prevVelocity.x !== this.velocity.x || this.prevVelocity.y !== this.velocity.y) {
      const packetOut: PlayerMovePacket.Out = {
        type: 'PLAYER_MOVE',
        velocity: {
          x: this.velocity.x,
          y: this.velocity.y,
        },
        time: delta,
      }
      console.log(packetOut)
      this.game.networkManager.sendMessage(JSON.stringify(packetOut));
      // PacketManager.queuePacketOut(packetOut);
    }
  }
  
  // move = (x: number, y: number, playerId: string): void => {
  //   if (playerId === this.playerId) {
  //     this.pos.x = x;
  //     this.pos.y = y;
  //   } else {
  //     const targetPlayer = this.players.find(p => p.playerId === playerId);      
  //     if (!targetPlayer) {
  //       return;
  //     }

  //     targetPlayer.position.x = x;
  //     targetPlayer.position.y = y;
  //   }
  // };

  public addPlayer = (player: Player): void => {
    if (player.playerId === this.playerId) {
      return;
    }
    if (this.players.find(p => p.playerId === player.playerId)) {
      return;
    }

    this.players.push(player);
  }

  public getPlayers = (): Array<Player> => {
    return this.players;
  }
}