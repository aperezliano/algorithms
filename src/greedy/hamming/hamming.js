const UnionFind = require('../models/union_find');

module.exports = hamming;

function hamming(nodes) {
  if (nodes === null) return null;

  const forest = new UnionFind(cleanNodes(nodes).length);
  const nodesMap = getNodesMap(cleanNodes(nodes));
  const distancesMap = getDistancesMap([...nodesMap.keys()]);

  for (let [key, distances] of distancesMap) {
    const sourceNode = nodesMap.get(key);

    for (let distance of distances) {
      if (!nodesMap.has(distance)) continue;

      const destNode = nodesMap.get(distance);
      if (forest.find(sourceNode) !== forest.find(destNode)) {
        forest.link(sourceNode, destNode);
      }
    }
  }

  return forest.groups();
}

function cleanNodes(nodes) {
  return [...new Set(nodes)].map((e) => e.replace(/ /g, ''));
}

function getNodesMap(nodes) {
  return new Map([...new Set(nodes)].map((e, i) => [parseInt(e, 2), i]));
}

function getDistancesMap(nodes) {
  const distancesMap = new Map();
  for (let node of nodes) {
    const distancesOf1 = getDistancesOf1(node);
    const distancesOf2 = getDistancesOf2(node);

    distancesMap.set(node, [...distancesOf1, ...distancesOf2]);
  }
  return distancesMap;
}

function getDistancesOf1(node) {
  return new Array(24).fill(0).map((_, i) => node ^ (1 << i));
}

function getDistancesOf2(node) {
  const result = [];
  for (let i = 0; i < 24; i++) {
    for (let j = i + 1; j < 24; j++) {
      result.push(node ^ (1 << i) ^ (1 << j));
    }
  }
  return result;
}
