const fs = require('fs');
const twoSum = require('../two-sum');

it('works with an input list of numbers', () => {
  const INPUT_NUMBERS = 'src/data_structures/map/__tests__/inputs/numbers.txt';
  let numbersList;
  try {
    numbersList = fs
      .readFileSync(INPUT_NUMBERS, 'utf8')
      .split('\n')
      .map((e) => parseInt(e))
      .filter((e) => Number.isInteger(e));
  } catch (err) {
    console.error(err);
  }
  expect(twoSum(numbersList.sort((a, b) => a - b))).toBe(47746);
});
