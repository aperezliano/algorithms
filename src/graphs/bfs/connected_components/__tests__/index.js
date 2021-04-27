const connectedComponents = require('../connected_components');
const Graph = require('../../../models/graph');

it('returns null with a null graph', () => {
  expect(connectedComponents(null)).toBeNull();
});

it('returns the groups [2,1] [0, 3] for the graph [0->3, 1->2]', () => {
  const graph = new Graph();
  graph.addEdge(0, 3);
  graph.addEdge(1, 2);

  expect(connectedComponents(graph)).toEqual([
    [0, 3],
    [1, 2],
  ]);
});
