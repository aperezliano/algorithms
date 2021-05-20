const fs = require('fs');
const readline = require('readline');

const clustering = require('../clustering');

it('returns null with a null list of edges', () => {
  expect(clustering(null, null)).toBeNull;
});

it('returns 1 for k = 2', () => {
  const edges = [[1, 2, 1]];

  expect(clustering(edges, 2, 2)).toBe(1);
});

it('returns 100 for k = 2', () => {
  const edges = [
    [1, 2, 1],
    [1, 3, 100],
    [1, 4, 100],
    [1, 5, 100],
    [2, 3, 100],
    [2, 4, 100],
    [2, 5, 100],
    [3, 4, 10],
    [3, 5, 10],
    [4, 5, 10],
  ];

  expect(clustering(edges, 5, 2)).toBe(100);
});
it('1. returns 2 for k = 2', () => {
  const edges = [
    [1, 2, 5],
    [2, 3, 1],
    [3, 4, 9],
    [4, 1, 2],
  ];

  expect(clustering(edges, 4, 2)).toBe(5);
});

it('2. returns 2 for k = 2', () => {
  const edges = [
    [1, 2, 1],
    [1, 3, 1],
    [1, 4, 5],
    [2, 3, 5],
    [2, 4, 3],
    [3, 4, 4],
  ];

  expect(clustering(edges, 4, 2)).toBe(3);
});

it('returns 50 for k = 3', () => {
  const edges = [
    [1, 2, 5],
    [2, 3, 50],
    [3, 4, 6],
    [3, 5, 60],
    [5, 6, 7],
  ];

  expect(clustering(edges, 6, 3)).toBe(50);
});

it('8', () => {
  testFromFile('src/greedy/clustering/__tests__/inputs/8.txt', 8, 4, 21);
});

it('12', () => {
  testFromFile('src/greedy/clustering/__tests__/inputs/12.txt', 12, 4, 99);
});

it('32', () => {
  testFromFile('src/greedy/clustering/__tests__/inputs/32.txt', 32, 4, 90);
});

it('256', () => {
  testFromFile('src/greedy/clustering/__tests__/inputs/256.txt', 256, 4, 1075);
});

it('500', () => {
  testFromFile('src/greedy/clustering/__tests__/inputs/clusters.txt', 500, 4, 106);
});

it('512', () => {
  testFromFile('src/greedy/clustering/__tests__/inputs/512.txt', 512, 4, 2566);
});

it.skip('1024', () => {
  testFromFile('src/greedy/clustering/__tests__/inputs/1024.txt', 1024, 4, 6666);
});

function testFromFile(filePath, size, k, result) {
  const INPUT_CLUSTER_PATH = filePath;
  const edges = [];

  const rl = readline.createInterface({
    input: fs.createReadStream(INPUT_CLUSTER_PATH, { encoding: 'utf8' }),
    terminal: false,
  });

  rl.on('line', (row) => {
    edges.push(
      row
        .split(' ')
        .filter((e) => e !== '')
        .map((e) => parseInt(e))
    );
  });

  rl.on('close', () => {
    expect(clustering(edges, size, k)).toBe(result);
  });
}
