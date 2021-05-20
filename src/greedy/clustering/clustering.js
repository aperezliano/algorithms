const UnionFind = require('../models/union_find');

module.exports = clustering;

function clustering(edges, numNodes, k) {
  if (edges === null || numNodes === null || k === null) return null;

  const forest = new UnionFind(numNodes);
  const sortedEdges = edges.sort((a, b) => a[2] - b[2]);
  let distance = 0;

  for (let edge of sortedEdges) {
    if (forest.groups() <= k) {
      if (forest.find(edge[0] - 1) !== forest.find(edge[1] - 1)) {
        distance = edge[2];
        break;
      }
      continue;
    }

    if (forest.find(edge[0] - 1) !== forest.find(edge[1] - 1)) {
      forest.link(edge[0] - 1, edge[1] - 1);
    }
  }

  return distance;
}
