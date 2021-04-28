const fs = require('fs');

const stronglyConnected = require('./strongly_connected');
const Graph = require('../../models/graph');

const INPUT_GRAPH_PATH = 'src/graphs/dfs/strongly_connected/__tests__/inputs/SCC.txt';
let graphList;
try {
  graphList = fs.readFileSync(INPUT_GRAPH_PATH, 'utf8').split('\n');
} catch (err) {
  console.error(err);
}

const graph = new Graph(true);
graphList.forEach((row) => {
  const edges = row
    .split(' ')
    .map((e) => parseInt(e))
    .filter((e) => !isNaN(e));
  const node = edges.shift();
  edges.forEach((e) => {
    graph.addEdge(node, e);
  });
});

console.log(
  stronglyConnected(graph)
    .sort((a, b) => b - a)
    .slice(0, 5)
);

const used = process.memoryUsage();
for (let key in process.memoryUsage()) {
  console.log(`${key} ${Math.round((used[key] / 1024 / 1024) * 100) / 100} MB`);
}
