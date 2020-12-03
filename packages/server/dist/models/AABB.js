"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AABB = void 0;
const schema_1 = require("@colyseus/schema");
class AABB extends schema_1.Schema {
    constructor(minX, minY, maxX, maxY) {
        super();
        this.minX = minX;
        this.minY = minY;
        this.maxX = maxX;
        this.maxY = maxY;
    }
}
AABB.copy = (aabb) => {
    return new AABB(aabb.minX, aabb.minY, aabb.maxX, aabb.maxY);
};
__decorate([
    schema_1.type("number")
], AABB.prototype, "minX", void 0);
__decorate([
    schema_1.type("number")
], AABB.prototype, "minY", void 0);
__decorate([
    schema_1.type("number")
], AABB.prototype, "maxX", void 0);
__decorate([
    schema_1.type("number")
], AABB.prototype, "maxY", void 0);
exports.AABB = AABB;
//# sourceMappingURL=AABB.js.map