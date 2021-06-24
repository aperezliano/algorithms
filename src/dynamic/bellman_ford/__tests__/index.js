const bellmanFord = require('../bellman_ford');
const Graph = require('../../../graphs/models/weight_graph');

it('works for a simple graph 1', () => {
  const graph = new Graph();
  graph.addEdge('s', { node: 'v', weight: 2 });
  graph.addEdge('s', { node: 'x', weight: 4 });
  graph.addEdge('v', { node: 'x', weight: 1 });
  graph.addEdge('v', { node: 'w', weight: 2 });
  graph.addEdge('x', { node: 't', weight: 4 });
  graph.addEdge('w', { node: 't', weight: 2 });
  const result = bellmanFord(graph, 's');
  expect(result[1].s).toBe(0);
  expect(result[1].t).toBe(6);
  expect(result[1].v).toBe(2);
  expect(result[1].w).toBe(4);
  expect(result[1].x).toBe(3);
});

it('works for a simple graph 2', () => {
  const graph = new Graph();
  graph.addEdge(1, { node: 2, weight: 2 });
  graph.addEdge(1, { node: 5, weight: 3 });
  graph.addEdge(2, { node: 4, weight: -2 });
  graph.addEdge(3, { node: 1, weight: 1 });
  graph.addEdge(4, { node: 1, weight: 4 });
  graph.addEdge(4, { node: 3, weight: 1 });
  graph.addEdge(4, { node: 5, weight: 2 });
  graph.addEdge(5, { node: 3, weight: -1 });
  let minEdge = Number.POSITIVE_INFINITY;
  for (let node of graph.getNodes()) {
    const newMin = Math.min(...Object.values(bellmanFord(graph, node)[1]));
    minEdge = Math.min(newMin, minEdge);
  }
  expect(minEdge).toBe(-2);
});

it('works for a graph with a negative cycle', () => {
  const graph = new Graph();
  graph.addEdge('s', { node: 'v', weight: 2 });
  graph.addEdge('v', { node: 'x', weight: -1 });
  graph.addEdge('x', { node: 't', weight: -4 });
  graph.addEdge('t', { node: 'v', weight: -4 });
  const result = bellmanFord(graph, 's');
  expect(result).toBeNull();
});
