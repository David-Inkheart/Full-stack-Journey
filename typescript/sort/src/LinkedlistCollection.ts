import { Sorter } from './Sorter';

class Node {
  next: Node | null = null;
  constructor(public data: number) {}
}

export class LinkedList extends Sorter {
  head: Node | null = null;

  add(data: number): void {
    const node = new Node(data);
    // if there is no head, make the new node the head
    if (!this.head) {
      this.head = node;
      return;
    }
    // if there is a head, traverse to the end of the list and add the new node
    let tail = this.head;
    while (tail.next) {
      tail = tail.next;
    }
    tail.next = node;
  }

  // getter
  // whenever we call length, we don't need to call it as a function, we can just call it as a property
  get length(): number {
    // if there is no head, return 0
    if (!this.head) {
      return 0;
    }
    // if there is a head, traverse the list and count the number of nodes
    let length = 1;
    let node = this.head;
    while (node.next) {
      length++;
      node = node.next;
    }
    return length;
  }

  // at is a method that returns the node at a given index
  // if the index is out of bounds, throw an error
  at(index: number): Node {
    // if there is no head, throw an error
    if (!this.head) {
      throw new Error('Index out of bounds');
    }
    // if there is a head, traverse the list and return the node at the given index
    let counter = 0;
    let node: Node | null = this.head;
    while (node) {
      // if the counter is equal to the index, return the node
      if (counter === index) {
        return node;
      }
      // if the counter is not equal to the index, increment the counter and traverse to the next node
      counter++;
      node = node.next;
    }
    // if the index is out of bounds, throw an error
    throw new Error('Index out of bounds');
  }

  compare(leftIndex: number, rightIndex: number): boolean {
    // if there is no head, throw an error
    if (!this.head) {
      throw new Error('List is empty');
    }
    // if there is a head, return true if the value at leftIndex is greater than the value at rightIndex
    return this.at(leftIndex).data > this.at(rightIndex).data;
  }

  swap(leftIndex: number, rightIndex: number): void {
    // if there is no head, throw an error
    if (!this.head) {
      throw new Error('List is empty');
    }
    // if there is a head, swap the values at leftIndex and rightIndex
    const leftNode = this.at(leftIndex);
    const rightNode = this.at(rightIndex);

    const leftHand = leftNode.data;
    leftNode.data = rightNode.data;
    rightNode.data = leftHand;
  }

  print(): void {
    // if there is no head, throw an error
    if (!this.head) {
      throw new Error('List is empty');
    }
    // if there is a head, traverse the list and print the values of each node
    let node: Node | null = this.head;
    while (node) {
      console.log(node.data);
      node = node.next;
    }
  }
}
