import { ShapeAABB } from './ShapeAABB';

export const checkCollisionAABB = (aabb1: ShapeAABB, aabb2: ShapeAABB): boolean => {
  return (aabb1.x < aabb2.x + aabb2.width &&
    aabb1.x + aabb1.width > aabb2.x &&
    aabb1.y < aabb2.y + aabb2.height &&
    aabb1.y + aabb1.height > aabb2.y);
}