module.exports = class UnionFind {
  #roots;
  #ranks;

  constructor(size) {
    this.#roots = new Array(size).fill(0).map((_, i) => i);
    this.#ranks = new Array(size).fill(0);
  }

  find(position) {
    return this.#roots[position];
  }

  link(x, y) {
    const rootX = this.#roots[x];
    const rootY = this.#roots[y];

    if (rootX === rootY) return;
    if (this.#ranks[rootX] > this.#ranks[rootY]) {
      this.#ranks[rootX] += this.#roots.filter((root) => root === rootY).length;
      this.#roots = this.#roots.map((root) => (root === rootY ? rootX : root));
    } else {
      this.#ranks[rootY] += this.#roots.filter((root) => root === rootX).length;
      this.#roots = this.#roots.map((root) => (root === rootX ? rootY : root));
    }
  }

  groups() {
    return new Set(this.#roots).size;
  }
};
