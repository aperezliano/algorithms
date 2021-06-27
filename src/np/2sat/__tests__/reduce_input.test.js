const fs = require('fs');
const readline = require('readline');

const reduceInput = require('../reduce_input');

it('works for a sample input', () => {
  const clauses = [
    [1, 2],
    [-1, 3],
    [2, -3],
    [-3, 5],
    [-3, -5],
    [3, 5],
  ];

  expect(reduceInput(clauses)).toEqual([
    [-3, 5],
    [-3, -5],
    [3, 5],
  ]);
});

it.each([
  ['src/np/2sat/.inputs/2sat1.txt', 6],
  ['src/np/2sat/.inputs/2sat2.txt', 57],
  ['src/np/2sat/.inputs/2sat3.txt', 295],
  ['src/np/2sat/.inputs/2sat4.txt', 11],
  ['src/np/2sat/.inputs/2sat5.txt', 101],
  ['src/np/2sat/.inputs/2sat6.txt', 26],
])('works for big input files', async (path, expectedLength) => {
  const clauses = await testFromFile(path);
  expect(clauses.length).toBe(expectedLength);
});

function testFromFile(filePath) {
  return new Promise((resolve) => {
    const FILE_PATH = filePath;
    const clauses = [];

    const rl = readline.createInterface({
      input: fs.createReadStream(FILE_PATH, { encoding: 'utf8' }),
      terminal: false,
    });

    rl.on('line', (row) => {
      clauses.push(
        row
          .split(' ')
          .filter((e) => e !== '')
          .map((e) => parseInt(e))
      );
    });

    rl.on('close', () => {
      resolve(reduceInput(clauses));
    });
  });
}
