const fs = require('fs');
const readline = require('readline');

const dijkstra = require('../dijkstra');
const WeightGraph = require('../../models/weight_graph');

it('returns null with a null graph', () => {
  expect(dijkstra(null)).toBeNull();
});

it('returns an empty array with an empty graph', () => {
  expect(dijkstra(new WeightGraph())).toEqual(new Map());
});

it('returns the array [0,1,3,6] array with a simple graph', () => {
  const graph = new WeightGraph();
  graph.addEdge(0, { node: 1, weight: 1 });
  graph.addEdge(0, { node: 2, weight: 4 });
  graph.addEdge(1, { node: 2, weight: 2 });
  graph.addEdge(1, { node: 3, weight: 6 });
  graph.addEdge(2, { node: 3, weight: 3 });
  const distances = [...dijkstra(graph, 0).values()];
  expect(distances).toEqual([0, 1, 3, 6]);
});

it('works for large input Graph', () => {
  const INPUT_GRAPH_PATH = 'src/graphs/dijkstra/__tests__/inputs/input_graph.txt';
  const graph = new WeightGraph();

  const rl = readline.createInterface({
    input: fs.createReadStream(INPUT_GRAPH_PATH, { encoding: 'utf8' }),
    terminal: false,
  });

  rl.on('line', (row) => {
    const edges = row.split('\t').filter((e) => e !== '');
    const node = parseInt(edges.shift());
    edges.forEach((e) => {
      const dest = {
        node: parseInt(e.split(',')[0]),
        weight: parseInt(e.split(',')[1]),
      };
      graph.addEdge(node, dest);
    });
  });

  rl.on('close', () => {
    const distances = dijkstra(graph, 1);
    const result = [
      distances.get(7),
      distances.get(37),
      distances.get(59),
      distances.get(82),
      distances.get(99),
      distances.get(115),
      distances.get(133),
      distances.get(165),
      distances.get(188),
      distances.get(197),
    ];
    expect(result).toEqual([2599, 2610, 2947, 2052, 2367, 2399, 2029, 2442, 2505, 3068]);
  });
});
