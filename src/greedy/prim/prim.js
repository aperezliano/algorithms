const Heap = require('heap');

module.exports = prim;

function prim(graph, node) {
  if (graph === null || node === null) return null;
  let cost = 0;
  const { minHeap, heapItems } = initHeap(graph.getNodes(), node);

  while (minHeap.size() > 0) {
    const currentNode = minHeap.pop();
    heapItems.delete(currentNode.node);
    cost += currentNode.weight;

    const edges = graph.getEdges(currentNode.node);
    for (let { node, weight } of edges) {
      if (heapItems.has(node) && heapItems.get(node).weight > weight) {
        heapItems.get(node).weight = weight;
        minHeap.updateItem(heapItems.get(node));
      }
    }
  }

  return cost;
}

function initHeap(nodes, sourceNode) {
  const heapItems = new Map();
  const minHeap = new Heap(function (a, b) {
    return a.weight - b.weight;
  });
  for (let node of nodes) {
    heapItems.set(node, { node, weight: node === sourceNode ? 0 : Number.POSITIVE_INFINITY });
    minHeap.push(heapItems.get(node));
  }
  return { minHeap, heapItems };
}
