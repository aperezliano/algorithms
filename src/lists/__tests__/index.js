const mergeSort = require('../mergesort');

it('works with a null input', () => {
  expect(mergeSort(null)).toEqual(null);
});

it('works with an empty array', () => {
  expect(mergeSort([])).toEqual([]);
});

it('works with the array [4,3,2,1]', () => {
  expect(mergeSort([4, 3, 2, 1])).toEqual([1, 2, 3, 4]);
});

it('works with the array [1,3,2,6,5,8,7,9,4]', () => {
  expect(mergeSort([1, 3, 2, 6, 5, 8, 7, 9, 4])).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

it('works with 100 random arrays', () => {
  for (let i = 0; i < 100; i++) {
    const randomArray = new Array(Math.floor(Math.random() * 100)).fill(0).map((e) => Math.floor(Math.random() * 1000));
    expect(mergeSort(randomArray)).toEqual(randomArray.sort((a, b) => a - b));
  }
});
