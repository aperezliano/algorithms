module.exports = steps;

function steps(graph, initialNode) {
  if (graph === null || initialNode === null) return null;
  const visitedNodes = new Map(graph.getNodes().map((e) => [e, false]));
  const queue = [initialNode];
  if (!visitedNodes.has(initialNode)) return null;
  let steps = 0;
  while (queue.length > 0) {
    const currentNode = queue.shift();
    visitedNodes.set(currentNode, true);
    const connectedNodes = graph.getConnectedNodes(currentNode);
    let stepCounted = false;

    connectedNodes.forEach((node) => {
      if (!visitedNodes.get(node) && !queue.includes(node)) {
        queue.push(node);
        if (!stepCounted) {
          steps++;
          stepCounted = true;
        }
      }
    });
  }
  return steps;
}
