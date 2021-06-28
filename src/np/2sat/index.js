const fs = require('fs');
const readline = require('readline');

const reduceInput = require('./reduce_input');
const papadimitriou = require('./papadimitriou');

function readAndReduceFromFile(filePath) {
  return new Promise((resolve) => {
    const FILE_PATH = filePath;
    const assignments = [];

    const rl = readline.createInterface({
      input: fs.createReadStream(FILE_PATH, { encoding: 'utf8' }),
      terminal: false,
    });

    rl.on('line', (row) => {
      assignments.push(
        row
          .split(' ')
          .filter((e) => e !== '')
          .map((e) => parseInt(e))
      );
    });

    rl.on('close', () => {
      console.log(`Initial assignments: ${assignments.length}`);
      resolve(reduceInput(assignments));
    });
  });
}

// 100100 (Only 2 are true)
(async function () {
  const files = [
    'src/np/2sat/.inputs/2sat1.txt',
    'src/np/2sat/.inputs/2sat2.txt',
    'src/np/2sat/.inputs/2sat3.txt',
    'src/np/2sat/.inputs/2sat4.txt',
    'src/np/2sat/.inputs/2sat5.txt',
    'src/np/2sat/.inputs/2sat6.txt',
  ];

  for await (let file of files) {
    console.log(`*** Reading: ${file} ***`);
    const assignments = await readAndReduceFromFile(file);
    console.log(`Reduced assignments: ${assignments.length}`);
    const is2Sat = papadimitriou(assignments);
    console.log(`is2Sat: ${is2Sat}`);
  }
})();
