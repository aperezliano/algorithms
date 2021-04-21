const findLocalMinimum = require('../local_minimum');

it.skip('works with null input', () => {
  expect(findLocalMinimum(null)).toBeNull();
});

it.skip('works with an empty matrix', () => {
  expect(findLocalMinimum([[], []])).toEqual({ x: null, y: null });
});

it.skip('returns the minimun of [[0,1],[2,4]]', () => {
  expect(
    findLocalMinimum([
      [0, 1],
      [2, 4],
    ])
  ).toEqual({ x: 0, y: 0 });
});

it.skip('returns the minimun of [[30,100,20,19,18],[29,101,21,104,17],[28,102,22,105,16],[27,103,23,106,15],[26,25,24,107,14]]', () => {
  expect(
    findLocalMinimum([
      [30, 100, 20, 19, 18],
      [29, 101, 21, 104, 17],
      [28, 102, 22, 105, 16],
      [27, 103, 23, 106, 15],
      [26, 25, 24, 107, 14],
    ])
  ).toEqual({ x: 4, y: 4 });
});
