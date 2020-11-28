import { Vector } from '../utils';

export type EntityType =
| 'player';

export class Entity {
  public id: string;
  public type: EntityType;
  public position: Vector;
  public size: Vector;
  public velocity: Vector;
  public color: number;

  constructor(id: string, type: EntityType, position: Vector, size: Vector, velocity: Vector, color: number) {
    this.id = id;
    this.type = type;
    this.position = position;
    this.size = size;
    this.velocity = velocity;
    this.color = color;
  }
}
