const fs = require('fs');
const readline = require('readline');
const knapsack = require('./knapsack');

testFromFile('src/dynamic/knapsack/__tests__/inputs/knapsack_big.txt', 2000000, 4243395);

function testFromFile(filePath, capacity, result) {
  const PATH = filePath;
  const items = [];

  const rl = readline.createInterface({
    input: fs.createReadStream(PATH, { encoding: 'utf8' }),
    terminal: false,
  });

  rl.on('line', (row) => {
    const [value, weight] = row.split(' ').map((e) => parseInt(e));
    items.push({ value, weight });
  });

  rl.on('close', () => {
    const knapsackResult = knapsack(items, capacity);
    console.log(`knapsack result is correct? ${knapsackResult === 4243395 ? '✅' : '❌'}`);
  });
}
