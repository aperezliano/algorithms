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
      this.#roots = this.#roots.map((root) => (root === rootY ? rootX : root));
      this.#ranks[rootX]++;
    } else {
      this.#roots = this.#roots.map((root) => (root === rootX ? rootY : root));
      this.#ranks[rootY]++;
    }
  }

  groups() {
    return new Set(this.#roots).size;
  }
};
