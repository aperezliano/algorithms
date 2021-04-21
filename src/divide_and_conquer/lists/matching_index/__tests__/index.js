const matchingIndex = require('../matching_index');

it('returns null with null input', () => {
  expect(matchingIndex(null)).toBeNull();
});

it('returns null with an empty array', () => {
  expect(matchingIndex([])).toBeNull();
});

it('returns null for an array with a single element != 0', () => {
  expect(matchingIndex([1])).toBeNull();
});

it('returns 0 for an array with a single element === 0', () => {
  expect(matchingIndex([0])).toBe(0);
});

it.each([[[1, 2]], [[-1, 3]]])('returns null for arrays with all A[i] !== i: %s', (array) => {
  expect(matchingIndex(array)).toBeNull();
});

it.each([
  [[0, 2], 0],
  [[-1, 0, 2], 2],
  [[-1, 0, 2, 3], 3],
  [[-10, -4, 1, 2, 4], 4],
])('returns last index that A[i] === i: %s', (array, expected) => {
  expect(matchingIndex(array)).toBe(expected);
});
