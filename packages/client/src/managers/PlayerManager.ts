import { Game } from '../Game';
import { Manager, Vector } from '../types';
import { Player } from './types';

const VELOCITY_SPEED = 0.3;
const MAX_SPEED = 5;

export class PlayerManager extends Manager {
  private prevPos: Vector;
  private pos: Vector;
  private velocity: Vector;
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
    this.prevPos = {
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
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;

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

    if (this.prevPos.x !== this.pos.x || this.prevPos.y !== this.pos.y) {
      const packet = {
        type: 'playerMove',
        payload: {
          playerId: this.playerId,
          x: this.pos.x,
          y: this.pos.y,
        }
      }
      this.game.networkManager.sendMessage(JSON.stringify(packet));
    }
  }
  
  move = (x: number, y: number, playerId: string): void => {
    if (playerId === this.playerId) {
      this.pos.x = x;
      this.pos.y = y;
    } else {
      const targetPlayer = this.players.find(p => p.playerId === playerId);      
      if (!targetPlayer) {
        return;
      }

      targetPlayer.position.x = x;
      targetPlayer.position.y = y;
    }
  };

  getPos = (): Vector => {
    return this.pos;
  };

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