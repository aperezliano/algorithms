const ithOrderStatisticRandom = require('../ith_order_statistic_random');
const ithOrderStatisticDeterministic = require('../ith_order_statistic_deterministic');

describe.each([ithOrderStatisticRandom, ithOrderStatisticDeterministic])('ith order statistic', (ithOrderStatistic) => {
  it('returns null with null array', () => {
    expect(ithOrderStatistic(null, 0)).toBeNull();
  });

  it('returns null with an empty array', () => {
    expect(ithOrderStatistic([], 0)).toBeNull();
  });

  it('returns null with an i bigger than the length of the array', () => {
    expect(ithOrderStatistic([1, 2], 3)).toBeNull();
  });

  it('returns 1 for the input [1,2], 1', () => {
    expect(ithOrderStatistic([1, 2], 1)).toBe(2);
  });

  it('returns 8 for the input [10,8,2,4], 2', () => {
    expect(ithOrderStatistic([10, 8, 2, 4], 2)).toBe(8);
  });

  it('returns 10 for the input [10,8,2,4], 3', () => {
    expect(ithOrderStatistic([10, 8, 2, 4], 3)).toBe(10);
  });

  it('returns 2 for the input [10,8,2,4], 0', () => {
    expect(ithOrderStatistic([10, 8, 2, 4], 0)).toBe(2);
  });

  it('returns 4 for the input [10,8,2,4], 1', () => {
    expect(ithOrderStatistic([10, 8, 2, 4], 1)).toBe(4);
  });

  it.each(
    new Array(100)
      .fill(0)
      .map(() => [new Array(20).fill(0).map(() => Math.floor(Math.random() * 1000)), Math.floor(Math.random() * 20)])
  )('returns the ith position for 100 random arrays and positions, %p, %p', (randomArray, i) => {
    expect(ithOrderStatistic(randomArray, i)).toBe(randomArray.sort((a, b) => a - b)[i]);
  });
});
