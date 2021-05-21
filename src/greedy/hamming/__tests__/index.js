const fs = require('fs');
const readline = require('readline');

const hamming = require('../hamming');

it('returns null with a null list of edges', () => {
  expect(hamming(null, null)).toBeNull;
});

it('Test 1', () => {
  const nodes = [
    '1 1 1 0 0 1 1 0 1 1 0 1 0 0 1 1 1 1 0 0 1 1 1 1',
    '1 1 1 0 0 1 1 0 0 1 0 1 0 0 1 1 1 1 0 0 1 1 1 1',
    '0 1 1 1 0 0 0 0 0 0 0 1 0 0 1 0 1 1 1 0 0 1 0 1',
    '0 1 1 1 0 0 0 0 0 0 0 1 0 0 1 0 1 0 1 0 0 1 0 1',
    '0 1 0 0 1 1 1 0 1 0 1 1 0 0 1 1 1 1 1 0 0 1 0 0',
    '0 1 0 0 1 0 1 0 1 0 1 1 0 0 1 1 1 1 1 0 0 1 0 0',
  ];

  expect(hamming(nodes, 6, 24)).toBe(3);
});

it('Test 2', () => {
  const nodes = [
    '1 1 1 0 0 1 1 0 1 1 0 1 0 0 1 1 1 1 0 0 1 1 1 1',
    '1 1 1 0 0 1 1 0 0 1 0 1 0 0 1 1 1 1 0 0 1 1 1 1',
    '0 1 1 1 0 0 0 0 0 0 0 1 0 0 1 0 1 1 1 0 0 1 0 1',
    '0 1 1 1 0 0 0 0 0 0 0 1 0 0 1 0 1 0 1 0 0 1 0 1',
    '0 1 0 0 1 1 1 0 1 0 1 1 0 0 1 1 1 1 1 0 0 1 0 0',
    '0 1 0 0 1 0 1 0 1 0 1 1 0 0 1 1 1 1 1 0 0 1 0 0',
    '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1',
  ];

  expect(hamming(nodes, 7, 24)).toBe(4);
});

it.skip('big cluster', () => {
  // Takes few minutes, skipping from the test suite
  testFromFile('src/greedy/hamming/__tests__/inputs/clusters.txt', 6118);
});

function testFromFile(filePath, result) {
  const INPUT_CLUSTER_PATH = filePath;
  const nodes = [];

  const rl = readline.createInterface({
    input: fs.createReadStream(INPUT_CLUSTER_PATH, { encoding: 'utf8' }),
    terminal: false,
  });

  rl.on('line', (row) => nodes.push(row.trim()));

  rl.on('close', () => {
    expect(hamming(nodes)).toBe(result);
  });
}
