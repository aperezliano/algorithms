const fs = require('fs');

const contraction = require('../contraction');
const Graph = require('../models/graph');

it('returns null with null input', () => {
  expect(contraction(null)).toBeNull();
});

it('returns null with an empty graph', () => {
  expect(contraction(new Graph())).toBeNull();
});

it('returns two nodes with a graph [0 -> 2, 1 -> 2, 2 -> 0,1] and just one cut', () => {
  const graph = new Graph();
  graph.addEdge(0, 2);
  graph.addEdge(1, 2);

  const contractedGraph = contraction(graph).getAdjancencyMap();
  expect(contractedGraph.size).toBe(2);
  expect([...contractedGraph.entries()].every(([_, edges]) => edges.length === 1)).toBe(true);
});

it('returns two nodes with a graph [0 -> 2, 1 -> 2, 2 -> 0,1] and a max of 4 cuts & min of 3', () => {
  const graph = new Graph();
  graph.addEdge(0, 1);
  graph.addEdge(0, 2);
  graph.addEdge(0, 3);
  graph.addEdge(1, 2);
  graph.addEdge(1, 3);
  graph.addEdge(2, 3);

  const contractedGraph = contraction(graph).getAdjancencyMap();
  expect(contractedGraph.size).toBe(2);
  expect([...contractedGraph.entries()].every(([_, edges]) => edges.length <= 4 && edges.length >= 3)).toBe(true);
});

it.skip('the minimum cuts with TONS of executions of a large graph', () => {
  const INPUT_GRAPH_PATH = 'src/divide_and_conquer/graphs/__tests__/inputs/karger_min_cut.txt';
  let graphList;
  try {
    graphList = fs.readFileSync(INPUT_GRAPH_PATH, 'utf8').split('\n');
  } catch (err) {
    console.error(err);
  }

  const graph = new Graph();
  graphList.forEach((row) => {
    const edges = row
      .split('\t')
      .map((e) => parseInt(e))
      .filter((e) => !isNaN(e));
    const node = edges.shift();
    edges.forEach((e) => {
      graph.addEdge(node, e);
    });
  });
  let minCuts = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < 9999999; i++) {
    const contractedGraph = contraction(graph).getAdjancencyMap();
    const cuts = [...contractedGraph.values()][0].length;
    minCuts = cuts < minCuts ? cuts : minCuts;
  }
  expect(minCuts).toBe(17);
});
