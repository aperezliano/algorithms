module.exports = class WeightGraph {
  #nodes;
  #adjancencyMap;
  #inEdges;

  constructor() {
    this.#nodes = new Map();
    this.#inEdges = new Map();
    this.#adjancencyMap = null;
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.#nodes.size;
  }

  getAdjancencyMap() {
    if (this.#adjancencyMap) return this.#adjancencyMap;
    this.#adjancencyMap = new Map();
    [...this.#nodes.entries()].forEach(([node, edges]) => {
      this.#adjancencyMap.set(node, [...edges]);
    });
    return this.#adjancencyMap;
  }

  getNodes() {
    return this.#nodes.keys();
  }

  getEdges(node) {
    return this.#nodes.get(node);
  }

  getInEdges(inNode) {
    if (this.#inEdges.has(inNode)) return this.#inEdges.get(inNode);
    const inEdges = [];
    for (let [node, vertexes] of this.getAdjancencyMap().entries()) {
      vertexes.forEach((vertex) => {
        if (vertex.node === inNode) inEdges.push({ node, weight: vertex.weight });
      });
    }
    this.#inEdges.set(inNode, inEdges);
    return inEdges;
  }

  addEdge(src, dest) {
    if (!this.#nodes.has(src)) this.#addNode(src);
    if (!this.#nodes.has(dest.node)) this.#addNode(dest.node);

    this.#nodes.get(src).push({ node: dest.node, weight: dest.weight });
  }

  #addNode(node) {
    if (!this.#nodes.has(node)) this.#nodes.set(node, []);
  }
};
