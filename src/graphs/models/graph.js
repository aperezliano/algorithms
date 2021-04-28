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
    return [...this.#nodes.keys()];
  }

  getConnectedNodes(node) {
    return this.#nodes.get(node);
  }

  addEdge(src, dest) {
    if (!this.#nodes.has(src)) this.#addNode(src);
    if (!this.#nodes.has(dest)) this.#addNode(dest);

    this.#nodes.get(src).push(dest);
    if (!this.#directed) this.#nodes.get(dest).push(src);
  }

  reverse() {
    if (!this.#directed) return;
    const reverseMap = new Map();
    for (let [node, edges] of this.#nodes) {
      if (!reverseMap.has(node)) reverseMap.set(node, []);
      for (let edge of edges) {
        if (!reverseMap.has(edge)) reverseMap.set(edge, []);
        reverseMap.get(edge).push(node);
      }
    }
    this.#nodes = reverseMap;
  }

  renameNodes(nodesMap) {
    const renamedNodes = new Map();
    for (let node of this.getNodes()) {
      const newEdges = this.getConnectedNodes(node).map((e) => nodesMap.get(e));
      this.#nodes.delete(node);
      renamedNodes.set(nodesMap.get(node), newEdges);
    }
    this.#nodes = renamedNodes;
  }

  #addNode(node) {
    if (!this.#nodes.has(node)) this.#nodes.set(node, []);
  }
};
