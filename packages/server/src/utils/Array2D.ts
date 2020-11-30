const setToArray = <T>(array: Array<Array<T>>, x: number, y: number, item: T) => {
  const xAbs = x < 0 ? x * -1 : x;
  const yAbs = y < 0 ? y * -1 : y;

  if (!array[xAbs]) {
    array[xAbs] = [];
  }
  array[xAbs][yAbs] = item;
};

export class Array2D<T> {
  private topLeft = new Array<Array<T>>();
  private topRight = new Array<Array<T>>();
  private bottomLeft = new Array<Array<T>>();
  private bottomRight = new Array<Array<T>>();

  public set = (x: number, y: number, item: T) => {
    const subArray = this.getSubArray(x, y);
  
    const xAbs = x < 0 ? x * -1 : x;
    const yAbs = y < 0 ? y * -1 : y;

    if (!subArray[xAbs]) {
      subArray[xAbs] = [];
    }
    subArray[xAbs][yAbs] = item;
  }

  public get = (x: number, y: number): T | undefined => {
    const subArray = this.getSubArray(x, y);
    const xAbs = x < 0 ? x * -1 : x;
    const yAbs = y < 0 ? y * -1 : y;

    if (!subArray[xAbs]) {
      return undefined;
    }
    return subArray[xAbs][yAbs];
  }

  public clear = () => {
    this.topLeft = new Array<Array<T>>();
    this.topRight = new Array<Array<T>>();
    this.bottomLeft = new Array<Array<T>>();
    this.bottomRight = new Array<Array<T>>();
  }

  private getSubArray = (x: number, y: number): Array<Array<T>> => {
    if (x < 0) {
      if (y < 0) {
        return this.topLeft;
      } else {
        return this.bottomLeft;
      }
    } else {
      if (y < 0) {
        return this.topRight;
      } else {
        return this.bottomRight;
      }
    }
  }
}