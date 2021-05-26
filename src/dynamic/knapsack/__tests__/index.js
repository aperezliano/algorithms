const knapsack = require('../knapsack');

it('works for a small set', () => {
  const W = 6;
  const items = [
    { value: 3, weight: 4 },
    { value: 2, weight: 3 },
    { value: 4, weight: 2 },
    { value: 4, weight: 3 },
  ];

  expect(knapsack(items, W)).toEqual({
    includedItems: [
      { value: 4, weight: 2 },
      { value: 4, weight: 3 },
    ],
    optimalValue: 8,
  });
});
