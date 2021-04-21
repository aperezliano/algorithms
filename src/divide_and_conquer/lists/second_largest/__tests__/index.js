const secondLargest = require('../second_largest');

function getSecondLargestFromArray(array) {
  const sortedArray = array.sort((a, b) => b - a);
  return sortedArray[1] || null;
}

it('returns null with null input', () => {
  expect(secondLargest(null)).toBeNull();
});

it('returns null with an empty array', () => {
  expect(secondLargest([])).toBeNull();
});

it('returns null for an array with a single element', () => {
  expect(secondLargest([1])).toBeNull();
});

it.each([[[1, 1, 1]], [[null, null, null]]])('returns null for arrays with the same elements: %p', (array) => {
  expect(secondLargest(array)).toBeNull();
});

it.each([[[1, 2]], [[3, 4]]])('returns the smallest element for an array of 2 elements: %p', (array) => {
  expect(secondLargest(array)).toEqual(getSecondLargestFromArray(array));
});

it('returns the second largest from [3,4,7,9,10,11,12,11]', () => {
  expect(secondLargest([3, 4, 7, 9, 10, 11, 12, 11])).toEqual(11);
});

it.each(
  new Array(100)
    .fill(0)
    .map(() => [
      [...new Set(new Array(Math.floor(Math.random() * 200)).fill(0).map(() => Math.floor(Math.random() * 1000)))],
    ])
)('returns the second largest from 100 random arrays of unique elements: %p', (randomArray) => {
  expect(secondLargest(randomArray)).toEqual(getSecondLargestFromArray(randomArray));
});
