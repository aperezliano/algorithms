const bellmanFord = require('./bellman_ford');
const Graph = require('../../graphs/models/weight_graph');
const fs = require('fs');
const readline = require('readline');

testFromFile('src/dynamic/bellman_ford/inputs/g1.txt').then((res) => {
  console.log(`g1 ${res}`); // Negative Cycles
});
testFromFile('src/dynamic/bellman_ford/inputs/g2.txt').then((res) => {
  console.log(`g2 ${res}`); // Negative Cycles
});
testFromFile('src/dynamic/bellman_ford/inputs/g3.txt').then((res) => {
  console.log(`g3 ${res}`); // Shortest: -12
});

function testFromFile(filePath) {
  return new Promise((resolve) => {
    const PATH = filePath;
    const graph = new Graph();

    const rl = readline.createInterface({
      input: fs.createReadStream(PATH, { encoding: 'utf8' }),
      terminal: false,
    });

    rl.on('line', (row) => {
      const edges = row.split(' ').filter((e) => e !== '');
      const node = parseInt(edges.shift());
      const dest = {
        node: parseInt(edges[0]),
        weight: parseInt(edges[1]),
      };
      graph.addEdge(node, dest);
    });

    rl.on('close', () => {
      let result = null;
      let processed = 0;
      let minEdge = Number.POSITIVE_INFINITY;
      for (let node of graph.getNodes()) {
        result = bellmanFord(graph, node);
        if (result === null) break;
        const newMin = Math.min(...Object.values(result[1]));
        minEdge = Math.min(newMin, minEdge);

        if (processed % 20 === 0) {
          console.log(processed);
          console.log(minEdge);
        }
        processed++;
      }
      if (result === null) resolve(null);
      else resolve(minEdge);
    });
  });
}
