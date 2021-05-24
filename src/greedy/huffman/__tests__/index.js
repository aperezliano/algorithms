const fs = require('fs');
const readline = require('readline');

const huffman = require('../huffman');

require('../huffman');

it('returns null for null alphabet', () => {
  expect(huffman(null)).toBeNull();
});

it('works for small alphabet', () => {
  alphabet = [
    { character: 'A', weight: 3 },
    { character: 'B', weight: 2 },
    { character: 'C', weight: 6 },
    { character: 'D', weight: 8 },
    { character: 'E', weight: 2 },
    { character: 'F', weight: 6 },
  ];
  expect(huffman(alphabet)).toEqual(
    new Map([
      ['F', '10'],
      ['A', '011'],
      ['B', '0101'],
      ['E', '0100'],
      ['D', '00'],
      ['C', '11'],
    ])
  );
});

it('works a big input alphabet', () => {
  const INPUT_HUFFMAN_PATH = 'src/greedy/huffman/__tests__/inputs/huffman.txt';
  let lineNumber = 0;
  const alphabet = [];

  const rl = readline.createInterface({
    input: fs.createReadStream(INPUT_HUFFMAN_PATH, { encoding: 'utf8' }),
    terminal: false,
  });

  rl.on('line', (row) => {
    alphabet.push({
      character: lineNumber++,
      weight: parseInt(row),
    });
  });

  rl.on('close', () => {
    const result = huffman(alphabet);
    let longestString = '';
    let shortestString = new Array(9000).fill(0).join();
    for (let code of result.values()) {
      if (longestString.length < code.length) {
        longestString = code;
      }
      if (shortestString.length > code.length) {
        shortestString = code;
      }
    }
    expect(longestString.length).toBe(19);
    expect(shortestString.length).toBe(9);
  });
});
