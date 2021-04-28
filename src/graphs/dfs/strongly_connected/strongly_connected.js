module.exports = stronglyConnected;

function stronglyConnected(graph) {
  if (graph === null) return null;

  // 1st pass
  graph.reverse();
  const topologicalOrder = getTopologicalOrder(graph);
  graph.renameNodes(topologicalOrder);

  // 2nd pass
  graph.reverse();
  return getMaximumSCCs(graph);
}

function getTopologicalOrder(graph) {
  const visitedNodes = new Map(graph.getNodes().map((node) => [node, false]));

  const labels = new Map(graph.getNodes().map((node) => [node, 0]));
  let currentLabel = 0;

  for (let node = visitedNodes.size; node > 0; node--) {
    if (!visitedNodes.get(node)) dfs(graph, node);
  }

  function dfs(graph, node) {
    visitedNodes.set(node, true);
    for (let connectedNode of graph.getConnectedNodes(node)) {
      if (!visitedNodes.get(connectedNode)) dfs(graph, connectedNode);
    }
    labels.set(node, ++currentLabel);
  }

  return labels;
}

function getMaximumSCCs(graph) {
  const visitedNodes = new Map(graph.getNodes().map((node) => [node, false]));
  const maxSCCs = [];
  let maxNodes;

  for (let node = visitedNodes.size; node > 0; node--) {
    maxNodes = 0;
    if (!visitedNodes.get(node)) maxSCCs.push(dfs(graph, node));
  }

  function dfs(graph, node) {
    visitedNodes.set(node, true);
    maxNodes++;
    for (let connectedNode of graph.getConnectedNodes(node)) {
      if (!visitedNodes.get(connectedNode)) {
        dfs(graph, connectedNode);
      }
    }
    return maxNodes;
  }

  return maxSCCs;
}
