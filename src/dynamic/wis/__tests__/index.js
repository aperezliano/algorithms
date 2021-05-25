const fs = require('fs');
const readline = require('readline');

const mwis = require('../mwis');

it('works a big input graph', () => {
  const GRAPH_PATH = 'src/dynamic/wis/__tests__/mwis.txt';
  const nodes = [];

  const rl = readline.createInterface({
    input: fs.createReadStream(GRAPH_PATH, { encoding: 'utf8' }),
    terminal: false,
  });

  rl.on('line', (row) => {
    nodes.push(parseInt(row));
  });

  rl.on('close', () => {
    const result = mwis(nodes);
    expect(result.includes(0)).toBe(true);
    expect(result.includes(1)).toBe(false);
    expect(result.includes(2)).toBe(true);
    expect(result.includes(3)).toBe(false);
    expect(result.includes(16)).toBe(false);
    expect(result.includes(116)).toBe(true);
    expect(result.includes(516)).toBe(true);
    expect(result.includes(996)).toBe(false);
  });
});
