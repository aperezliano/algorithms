const fs = require('fs');
const readline = require('readline');
const median = require('../median');

it('calculates the sum of all the medians from an input file (mod 1000)', () => {
  const INPUT_NUMBERS = 'src/data_structures/heap/median/__tests__/inputs/numbers.txt';
  let sum = 0;

  const rl = readline.createInterface({
    input: fs.createReadStream(INPUT_NUMBERS, { encoding: 'utf8' }),
    terminal: false,
  });
  const medianGenerator = median();
  medianGenerator.next();
  rl.on('line', (row) => {
    const number = parseInt(row);
    if (!Number.isNaN(number)) {
      sum += medianGenerator.next(number).value;
    }
  });

  rl.on('close', () => {
    expect(sum % 10000).toBe(5294);
  });
});
