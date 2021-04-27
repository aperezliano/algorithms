module.exports = connectedComponents;

function connectedComponents(graph) {
  if (graph === null) return null;

  const nodes = graph.getNodes();
  let exploredNodes = [];
  let result = [];
  for (let node of nodes) {
    if (!exploredNodes.includes(node)) {
      const connectedNodes = bfs(graph, node);
      exploredNodes = exploredNodes.concat([...new Set(connectedNodes)]);
      result.push(connectedNodes);
    }
  }
  return result;
}

function bfs(graph, node) {
  let queue = [node];
  const visitedNodes = [];
  const result = [];
  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node);
    const connectedNodes = graph.getConnectedNodes(node);
    for (connectedNode of connectedNodes) {
      if (visitedNodes.includes(connectedNode)) continue;
      visitedNodes.push(node);
      queue.push(connectedNode);
    }
  }
  return result;
}
