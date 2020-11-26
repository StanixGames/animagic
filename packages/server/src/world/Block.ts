export class Block {
  public x: number;
  public y: number;
  public material: 'dirt' | 'sand';

  constructor(x: number, y: number, material: 'dirt' | 'sand') {
    this.x = x;
    this.y = y;
    this.material = material;
  }
}