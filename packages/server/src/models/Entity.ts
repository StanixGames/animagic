import { Schema, type } from "@colyseus/schema";

const ENTITY_MAX_SPEED = 2;

export class Entity extends Schema {
  @type("string") id: string;
  @type("number") x: number;
  @type("number") y: number;
  @type("number") width: number;
  @type("number") height: number;
  @type("number") velX: number;
  @type("number") velY: number;
  @type("number") maxSpeed: number;
  @type("number") color: number;

  constructor(
    id: string,
    x: number,
    y: number,
    width: number,
    height: number,
    velX: number,
    velY: number,
    color: number,
  ) {
    super();

    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.velX = velX;
    this.velY = velY;
    this.maxSpeed = ENTITY_MAX_SPEED;
    this.color = color;
  }

  public static copy = (entity: Entity): Entity => {
    return new Entity(
      entity.id,
      entity.x,
      entity.y,
      entity.width,
      entity.height,
      entity.velX,
      entity.velY,
      entity.color,
    );
  }
}
