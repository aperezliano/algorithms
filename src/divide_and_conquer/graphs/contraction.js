module.exports = contraction;

function contraction(graph) {
  if (graph === null || graph.isEmpty()) return null;

  while (graph.size() > 2) {
    const graphMap = graph.getAdjancencyMap();
    const [srcNode, edges] = [...graphMap.entries()][Math.floor(Math.random() * graphMap.size)];
    const destNode = edges[Math.floor(Math.random() * edges.length)];
    graph.contractEdge(srcNode, destNode);
  }

  return graph;
}
