const fs = require('fs');
const readline = require('readline');

const prim = require('../prim');
const WeightGraph = require('../../models/weight_graph');

it('returns null with a null graph', () => {
  expect(prim(null)).toBeNull();
});

it('returns 0 with an empty graph', () => {
  expect(prim(new WeightGraph())).toEqual(0);
});

it('returns 7 with a simple graph', () => {
  const graph = new WeightGraph();
  graph.addEdge(0, 1, 1);
  graph.addEdge(0, 2, 4);
  graph.addEdge(0, 3, 3);
  graph.addEdge(1, 3, 2);
  graph.addEdge(2, 3, 5);
  expect(prim(graph, 0)).toEqual(7);
});

it('returns 6 with a simple graph', () => {
  const graph = new WeightGraph();
  graph.addEdge(0, 1, 1);
  graph.addEdge(0, 2, 4);
  graph.addEdge(1, 2, 2);
  graph.addEdge(1, 3, 6);
  graph.addEdge(2, 3, 3);
  expect(prim(graph, 0)).toEqual(6);
});

it('works for a large input Graph', () => {
  const INPUT_GRAPH_PATH = 'src/greedy/prim/__tests__/inputs/graph.txt';
  const graph = new WeightGraph();

  const rl = readline.createInterface({
    input: fs.createReadStream(INPUT_GRAPH_PATH, { encoding: 'utf8' }),
    terminal: false,
  });

  rl.on('line', (row) => {
    const edges = row.split(' ').filter((e) => e !== '');
    const node = parseInt(edges.shift());
    const [dest, weight] = edges.map((e) => parseInt(e));
    graph.addEdge(node, dest, weight);
  });

  rl.on('close', () => {
    expect(prim(graph, 1)).toEqual(-3612829);
  });
});
