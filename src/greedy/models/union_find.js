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

    const rootXRank = this.#ranks[rootX];
    const rootYRank = this.#ranks[rootY];
    const [winner, looser] = rootXRank >= rootYRank ? [rootX, rootY] : [rootY, rootX];

    this.#increaseRanks(winner, looser);
    this.#updateRoots(winner, looser);
  }

  groups() {
    return new Set(this.#roots).size;
  }

  #increaseRanks(winner) {
    this.#ranks[winner]++;
  }

  #updateRoots(winner, looser) {
    this.#roots = this.#roots.map((root) => (root === looser ? winner : root));
  }
};
