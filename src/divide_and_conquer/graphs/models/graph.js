module.exports = class Graph {
  #nodes;

  constructor() {
    this.#nodes = new Map();
  }

  isEmpty() {
    return this.#nodes.size === 0;
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

  addEdge(src, dest) {
    if (!this.#nodes.has(src)) this.#addNode(src);
    if (!this.#nodes.has(dest)) this.#addNode(dest);
    if (this.#nodes.get(src).includes(dest) || this.#nodes.get(dest).includes(src)) return;

    this.#nodes.get(src).push(dest);
    this.#nodes.get(dest).push(src);
  }

  contractEdge(src, dest) {
    if (!(this.#nodes.has(src) && this.#nodes.has(dest))) return;

    const newNodeKey = Math.min(src, dest);
    const newNodeValues = [...this.#nodes.get(src), ...this.#nodes.get(dest)].filter((e) => e !== src && e !== dest);
    newNodeValues.forEach((node) => {
      this.#nodes.set(
        node,
        this.#nodes.get(node).map((e) => (e === src || e === dest ? newNodeKey : e))
      );
    });
    this.#nodes.delete(src);
    this.#nodes.delete(dest);
    this.#nodes.set(newNodeKey, newNodeValues);
  }

  #addNode(node) {
    if (!this.#nodes.has(node)) this.#nodes.set(node, []);
  }
};
