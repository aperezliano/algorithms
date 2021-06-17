module.exports = bellmanFord;

function bellmanFord(graph, sourceVertex) {
  let A = [{}];
  for (let node of graph.getNodes()) {
    A[0][node] = node === sourceVertex ? 0 : Number.POSITIVE_INFINITY;
  }
  for (let i = 1; i < graph.size() - 1; i++) {
    let anyUpdate = false;
    [A, anyUpdate] = calculateMinPaths(graph, A);
    A[0] = A[1];
    if (!anyUpdate) break;
  }
  [A, anyUpdate] = calculateMinPaths(graph, A);

  return Object.values(A[0]).join(',') === Object.values(A[1]).join(',') ? A : null;
}

function calculateMinPaths(graph, A) {
  A[1] = {};
  let anyUpdate = false;
  for (let node of graph.getNodes()) {
    const inEdges = graph.getInEdges(node);
    let minPrevPath = Number.POSITIVE_INFINITY;
    if (inEdges.length > 0) {
      const prevNode = inEdges
        .filter((e) => isFinite(A[0][e.node]))
        .reduce((acc, v) => (v.weight < acc.weight ? v : acc), { weight: Number.POSITIVE_INFINITY });
      minPrevPath = prevNode.node ? A[0][prevNode.node] + prevNode.weight : minPrevPath;
      anyUpdate = anyUpdate || isFinite(minPrevPath);
    }
    A[1][node] = Math.min(A[0][node], minPrevPath);
  }
  return [A, anyUpdate];
}
