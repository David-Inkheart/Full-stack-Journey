"use strict";
class Sortee {
    constructor(collection) {
        this.collection = collection;
    }
    sort() {
        const { length } = this.collection;
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length - i - 1; j++) {
                // All of this only works if collection is number[]
                // typeguard for any other type of value aside from number, string, boolean, symbol
                if (this.collection instanceof Array) {
                    if (this.collection[j] > this.collection[j + 1]) {
                        const leftHand = this.collection[j];
                        this.collection[j] = this.collection[j + 1];
                        this.collection[j + 1] = leftHand;
                    }
                }
                // Only going to work if collection is a string
                // If collection is a string, do this logic instead:
                // this type guard is a type of check that only works with number, string, boolean, symbol.
                if (typeof this.collection === 'string') {
                    this.collection;
                }
            }
        }
    }
}
const sortee = new Sorter([10, 3, -5, 0]);
sorter.sort();
console.log(sorter.collection);
