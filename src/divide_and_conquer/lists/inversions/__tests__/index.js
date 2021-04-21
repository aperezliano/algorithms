const fs = require('fs');
const inversions = require('../inversions');

it('works with a null input', () => {
  expect(inversions(null)).toEqual([null, 0]);
});

it('works with an empty array', () => {
  expect(inversions([])).toEqual([[], 0]);
});

it('works with the array [4,3,2,1]', () => {
  expect(inversions([4, 3, 2, 1])).toEqual([[1, 2, 3, 4], 4]);
});

it('works with the array [1,3,5,2,4,6]', () => {
  expect(inversions([1, 3, 5, 2, 4, 6])).toEqual([[1, 2, 3, 4, 5, 6], 3]);
});

it('works with the array [1,3,2,6,5,8,7,9,4]', () => {
  expect(inversions([1, 3, 2, 6, 5, 8, 7, 9, 4])).toEqual([[1, 2, 3, 4, 5, 6, 7, 8, 9], 7]);
});

it('works with a very large array', () => {
  const INPUT_ARRAY_PATH = 'src/divide_and_conquer/lists/inversions/__tests__/inputs/large_array.txt';
  try {
    const list = fs
      .readFileSync(INPUT_ARRAY_PATH, 'utf8')
      .split('\n')
      .map((e) => parseInt(e));
    const [sortedList, inversionsCount] = inversions(list);

    expect([sortedList, inversionsCount]).toEqual([list.sort((a, b) => a - b), 2167969707]);
  } catch (err) {
    console.error(err);
  }
});
