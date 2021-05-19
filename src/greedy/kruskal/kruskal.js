const UnionFind = require('union-find');

module.exports = kruskal;

function kruskal(edges, numNodes) {
  if (edges === null || numNodes === null) return null;

  const forest = new UnionFind(numNodes);
  const sortedEdges = edges.sort((a, b) => a[2] - b[2]);
  let cost = 0;

  for (edge of sortedEdges) {
    if (forest.find(edge[0]) !== forest.find(edge[1])) {
      forest.link(edge[0], edge[1]);
      cost += edge[2];
    }
  }

  return cost;
}
