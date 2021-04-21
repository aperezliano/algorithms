const unimodalMax = require('../unimodal_max');

it('returns null with null input', () => {
  expect(unimodalMax(null)).toBeNull();
});

it('returns null with an empty array', () => {
  expect(unimodalMax([])).toBeNull();
});

it.each([[[1]], [[2]], [[null]]])('returns the only element of an array of a single element: %p', (array) => {
  expect(unimodalMax(array)).toEqual(array[0]);
});

it.each([[[1, 2]], [[4, 3]]])('returns the max of an array of 2 elements: %p', (array) => {
  expect(unimodalMax(array)).toEqual(Math.max(...array));
});

it.each([
  [[1, 2, 3, 4, 3, 2, 1], 4],
  [[4, 3, 2, 1], 4],
  [[-3, -1, 0, 1, 2, 5, 1888, 100, -1999], 1888],
])('returns the max of an array of multiple elements: %p', (array, expected) => {
  expect(unimodalMax(array)).toEqual(expected);
});
