const bellmanFord = require('../bellman-ford');
const Graph = require('../../../graphs/models/weight_graph');

it('works for a simple graph', () => {
  const graph = new Graph();
  graph.addEdge('s', { node: 'v', weight: 2 });
  graph.addEdge('s', { node: 'x', weight: 4 });
  graph.addEdge('v', { node: 'x', weight: 1 });
  graph.addEdge('v', { node: 'w', weight: 2 });
  graph.addEdge('x', { node: 't', weight: 4 });
  graph.addEdge('w', { node: 't', weight: 2 });
  const result = bellmanFord(graph, 's', 4);
  expect(result[3].s).toBe(0);
  expect(result[3].t).toBe(6);
  expect(result[3].v).toBe(2);
  expect(result[3].w).toBe(4);
  expect(result[3].x).toBe(3);
});
