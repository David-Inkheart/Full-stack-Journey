export class NumbersCollection {
  constructor(public data: number[]) {}

  // getter
  // whenever we call length, we don't need to call it as a function, we can just call it as a property
  get length(): number {
    return this.data.length;
  }

  compare(leftIndex: number, rightIndex: number): boolean {
    return this.data[leftIndex] > this.data[rightIndex];
  }

  swap(leftIndex: number, rightIndex: number): void {
    // destructure
    [this.data[leftIndex], this.data[rightIndex]] = [
      this.data[rightIndex],
      this.data[leftIndex],
    ];
  }
}
