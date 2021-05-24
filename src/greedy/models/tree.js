module.exports = class Tree {
  #root;

  constructor(value) {
    this.#root = new Node(value);
  }

  merge(b) {
    this.#root = new Node(null, this.#root, b.getRoot());
    return this;
  }

  getRoot() {
    return this.#root;
  }

  getNodesMap() {
    return this.#getNodesMapRec(this.#root, new Map(), []);
  }

  #getNodesMapRec(node, map, code) {
    if (node.leftChild) {
      map = this.#getNodesMapRec(node.leftChild, map, `${code}0`);
    }
    if (node.rightChild) {
      map = this.#getNodesMapRec(node.rightChild, map, `${code}1`);
    }
    if (!node.leftChild && !node.rightChild) {
      map.set(node.value, code);
    }
    return map;
  }
};

class Node {
  constructor(value, leftChild, rightChild) {
    this.value = value;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
  }
}
