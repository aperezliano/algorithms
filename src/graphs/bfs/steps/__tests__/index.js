const steps = require('../steps');
const Graph = require('../../../models/graph');

it('returns null with a null graph', () => {
  expect(steps(null, null)).toBeNull();
});

it('returns null with a null initial node', () => {
  expect(steps(new Graph(), null)).toBeNull();
});

it('returns 3 for the graph [0->1, 1->2, 2->3] starting from 0', () => {
  const graph = new Graph();
  graph.addEdge(0, 1);
  graph.addEdge(1, 2);
  graph.addEdge(2, 3);
  expect(steps(graph, 0, 3)).toBe(3);
});

it('returns 3 for the graph [0->1, 1->2,3, 3->4] starting from 0', () => {
  const graph = new Graph();
  graph.addEdge(0, 1);
  graph.addEdge(1, 2);
  graph.addEdge(1, 3);
  graph.addEdge(2, 3);
  graph.addEdge(3, 4);
  expect(steps(graph, 0, 4)).toBe(3);
});
