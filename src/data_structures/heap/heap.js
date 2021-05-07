module.exports = class Heap {
  #data = new Array();
  #min;

  constructor(min = true) {
    this.#min = min;
  }

  insert(element) {
    const insertElement = this.#min ? element : -1 * element;
    this.#data.push(insertElement);
    this.#bubbleUp();
  }

  extract() {
    const returnElement = this.#data[0] ?? null;
    this.#data[0] = this.#data.pop();
    this.#bubbleDown();
    return this.#min ? returnElement : -1 * returnElement;
  }

  peek() {
    const returnElement = this.#data[0] ?? null;
    return this.#min ? returnElement : -1 * returnElement;
  }

  size() {
    return this.#data.length;
  }

  #bubbleUp() {
    let elementPosition = this.#data.length - 1;
    let parentElementPosition = this.#getParentPosition(elementPosition);

    while (this.#data[elementPosition] < this.#data[parentElementPosition]) {
      [this.#data[elementPosition], this.#data[parentElementPosition]] = [
        this.#data[parentElementPosition],
        this.#data[elementPosition],
      ];
      elementPosition = parentElementPosition;
      parentElementPosition = this.#getParentPosition(elementPosition);
    }
  }

  #getParentPosition(elementPosition) {
    return Math.floor((elementPosition - 1) / 2);
  }

  #bubbleDown() {
    let elementPosition = 0;
    let minChildPosition = this.#getMinChildPosition(elementPosition);

    while (this.#data[elementPosition] > this.#data[minChildPosition]) {
      [this.#data[elementPosition], this.#data[minChildPosition]] = [
        this.#data[minChildPosition],
        this.#data[elementPosition],
      ];

      elementPosition = minChildPosition;
      minChildPosition = this.#getMinChildPosition(elementPosition);
    }
  }

  #getMinChildPosition(elementPosition) {
    let leftChildPosition = elementPosition * 2 + 1;
    let rightChildPosition = elementPosition * 2 + 2;
    return this.#data[leftChildPosition] > this.#data[rightChildPosition] ? rightChildPosition : leftChildPosition;
  }
};
