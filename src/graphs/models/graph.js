module.exports = class Graph {
  #nodes;
  #directed;

  constructor(directed = false) {
    this.#nodes = new Map();
    this.#directed = directed;
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
    return this.#nodes.keys();
  }

  getConnectedNodes(node) {
    return this.#nodes.get(node);
  }

  reverse() {
    const reverseGraph = new Map();
    for (let [node, edges] of this.#nodes) {
      if (!reverseGraph.has(node)) reverseGraph.set(node, []);
      for (let edge of edges) {
        if (!reverseGraph.has(edge)) reverseGraph.set(edge, []);
        reverseGraph.get(edge).push(node);
      }
    }
    this.#nodes = reverseGraph;
  }

  renameNodes(renameMap) {
    const renamedGraph = new Map();
    for (let [node, edges] of this.#nodes) {
      renamedGraph.set(
        renameMap.get(node),
        edges.map((e) => renameMap.get(e))
      );
    }
    this.#nodes = renamedGraph;
  }

  addEdge(src, dest) {
    if (!this.#nodes.has(src)) this.#addNode(src);
    if (!this.#nodes.has(dest)) this.#addNode(dest);

    this.#nodes.get(src).push(dest);
    if (!this.#directed) this.#nodes.get(dest).push(src);
  }

  #addNode(node) {
    if (!this.#nodes.has(node)) this.#nodes.set(node, []);
  }
};
