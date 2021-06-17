module.exports = bellmanFord;

function bellmanFord(graph, sourceVertex) {
  const A = [{}];
  for (let node of graph.getNodes()) {
    A[0][node] = node === sourceVertex ? 0 : Number.POSITIVE_INFINITY;
  }
  for (let i = 1; i < graph.size() - 1; i++) {
    A[i] = {};
    for (let node of graph.getNodes()) {
      const inEdges = graph.getInEdges(node);
      let minPrevPath = Number.POSITIVE_INFINITY;
      if (inEdges.length > 0) {
        const prevNode = inEdges
          .filter((e) => isFinite(A[i - 1][e.node]))
          .reduce((acc, v) => (v.weight < acc.weight ? v : acc), { weight: Number.POSITIVE_INFINITY });
        minPrevPath = prevNode.node ? A[i - 1][prevNode.node] + prevNode.weight : minPrevPath;
      }
      A[i][node] = Math.min(A[i - 1][node], minPrevPath);
    }
  }
  return A;
}
