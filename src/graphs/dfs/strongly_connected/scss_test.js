const fs = require('fs');
const readline = require('readline');

const stronglyConnected = require('./strongly_connected');
const Graph = require('../../models/graph');

const INPUT_GRAPH_PATH = 'src/graphs/dfs/strongly_connected/__tests__/inputs/SCC.txt';
const graph = new Graph(true);

const rl = readline.createInterface({
  input: fs.createReadStream(INPUT_GRAPH_PATH, { encoding: 'utf8' }),
  terminal: false,
});

rl.on('line', (row) => {
  const edges = row
    .split(' ')
    .map((e) => parseInt(e))
    .filter((e) => !isNaN(e));
  const node = edges.shift();
  edges.forEach((e) => {
    graph.addEdge(node, e);
  });
});

rl.on('close', () => {
  console.log('Top 5 SCCs:');
  console.log(calculateTopFiveSCCs());
  console.log('***********');
  console.log('Memory usage:');
  printMemoryUsage();
});

function calculateTopFiveSCCs() {
  return stronglyConnected(graph)
    .sort((a, b) => b - a)
    .slice(0, 5);
}

function printMemoryUsage() {
  const used = process.memoryUsage();
  for (let key in process.memoryUsage()) {
    console.log(`${key} ${Math.round((used[key] / 1024 / 1024) * 100) / 100} MB`);
  }
}
