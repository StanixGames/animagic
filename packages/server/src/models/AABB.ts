import { Schema, type } from "@colyseus/schema";

export class AABB extends Schema {
  @type("number") minX: number;
  @type("number") minY: number;
  @type("number") maxX: number;
  @type("number") maxY: number;

  constructor(minX: number, minY: number, maxX: number, maxY: number) {
    super();
    
    this.minX = minX;
    this.minY = minY;
    this.maxX = maxX;
    this.maxY = maxY;
  }

  public static copy = (aabb: AABB): AABB => {
    return new AABB(
      aabb.minX,
      aabb.minY,
      aabb.maxX,
      aabb.maxY,
    );
  }
}
