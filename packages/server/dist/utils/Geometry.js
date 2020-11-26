"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCollisionAABB = void 0;
const checkCollisionAABB = (aabb1, aabb2) => {
    return (aabb1.x < aabb2.x + aabb2.width &&
        aabb1.x + aabb1.width > aabb2.x &&
        aabb1.y < aabb2.y + aabb2.height &&
        aabb1.y + aabb1.height > aabb2.y);
};
exports.checkCollisionAABB = checkCollisionAABB;
//# sourceMappingURL=Geometry.js.map