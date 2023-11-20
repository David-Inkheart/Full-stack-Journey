"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumbersCollection = void 0;
class NumbersCollection {
    constructor(data) {
        this.data = data;
    }
    // getter
    // whenever we call length, we don't need to call it as a function, we can just call it as a property
    get length() {
        return this.data.length;
    }
    compare(leftIndex, rightIndex) {
        return this.data[leftIndex] > this.data[rightIndex];
    }
    swap(leftIndex, rightIndex) {
        // destructure
        [this.data[leftIndex], this.data[rightIndex]] = [
            this.data[rightIndex],
            this.data[leftIndex],
        ];
    }
}
exports.NumbersCollection = NumbersCollection;
