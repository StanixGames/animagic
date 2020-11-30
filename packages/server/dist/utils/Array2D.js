"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Array2D = void 0;
const setToArray = (array, x, y, item) => {
    const xAbs = x < 0 ? x * -1 : x;
    const yAbs = y < 0 ? y * -1 : y;
    if (!array[xAbs]) {
        array[xAbs] = [];
    }
    array[xAbs][yAbs] = item;
};
class Array2D {
    constructor() {
        this.topLeft = new Array();
        this.topRight = new Array();
        this.bottomLeft = new Array();
        this.bottomRight = new Array();
        this.set = (x, y, item) => {
            const subArray = this.getSubArray(x, y);
            const xAbs = x < 0 ? x * -1 : x;
            const yAbs = y < 0 ? y * -1 : y;
            if (!subArray[xAbs]) {
                subArray[xAbs] = [];
            }
            subArray[xAbs][yAbs] = item;
        };
        this.get = (x, y) => {
            const subArray = this.getSubArray(x, y);
            const xAbs = x < 0 ? x * -1 : x;
            const yAbs = y < 0 ? y * -1 : y;
            if (!subArray[xAbs]) {
                return undefined;
            }
            return subArray[xAbs][yAbs];
        };
        this.clear = () => {
            this.topLeft = new Array();
            this.topRight = new Array();
            this.bottomLeft = new Array();
            this.bottomRight = new Array();
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
//# sourceMappingURL=Array2D.js.map