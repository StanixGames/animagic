"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Array2D = void 0;
const setToArray = (array, x, y, item) => {
    if (!array[x]) {
        array[x] = [];
    }
    array[x][y] = item;
};
class Array2D {
    constructor() {
        this.topLeft = new Array();
        this.topRight = new Array();
        this.bottomLeft = new Array();
        this.bottomRight = new Array();
        this.set = (x, y, item) => {
            const subArray = this.getSubArray(x, y);
            setToArray(subArray, x, y, item);
        };
        this.get = (x, y) => {
            const subArray = this.getSubArray(x, y);
            return subArray[x][y];
        };
        this.getSubArray = (x, y) => {
            if (x < 0) {
                if (y < 0) {
                    return this.topLeft;
                }
                else {
                    return this.bottomLeft;
                }
            }
            else {
                if (y < 0) {
                    return this.topRight;
                }
                else {
                    return this.bottomRight;
                }
            }
        };
    }
}
exports.Array2D = Array2D;
//# sourceMappingURL=NegativeArray.js.map