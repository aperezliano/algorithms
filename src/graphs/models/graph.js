module.exports = class Graph {
  #nodes;

  constructor() {
    this.#nodes = new Map();
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.#nodes.size;
  }

  getAdjancencyMap() {
    const adjancencyMap = new Map();
    [...this.#nodes.entries()].forEach(([node, edges]) => {
      adjancencyMap.set(node, [...edges]);
    });
    return adjancencyMap;
  }

  getNodes() {
    return [...this.#nodes.keys()];
  }

  getConnectedNodes(node) {
    return this.#nodes.get(node);
  }

  addEdge(src, dest) {
    if (!this.#nodes.has(src)) this.#addNode(src);
    if (!this.#nodes.has(dest)) this.#addNode(dest);
    if (this.#nodes.get(src).includes(dest) || this.#nodes.get(dest).includes(src)) return;

    this.#nodes.get(src).push(dest);
    this.#nodes.get(dest).push(src);
  }

  #addNode(node) {
    if (!this.#nodes.has(node)) this.#nodes.set(node, []);
  }
};
