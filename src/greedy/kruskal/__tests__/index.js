const kruskal = require('../kruskal');

it('returns null with a null list of edges', () => {
  expect(kruskal(null, null)).toBeNull;
});

it('returns 3 for a simple graph without cycles', () => {
  const edges = [
    [0, 1, 1],
    [1, 2, 1],
    [2, 3, 1],
  ];

  expect(kruskal(edges, 4)).toBe(3);
});

it('returns 3 for a simple graph with cycles', () => {
  const edges = [
    [0, 1, 1],
    [1, 2, 1],
    [2, 3, 1],
    [3, 0, 1],
  ];

  expect(kruskal(edges, 4)).toBe(3);
});

it('returns 3 for a simple graph with multiple paths', () => {
  const edges = [
    [0, 1, 1],
    [0, 1, 5],
    [1, 2, 1],
    [2, 3, 1],
    [2, 3, 9],
    [3, 1, 1],
    [3, 0, 5],
  ];

  expect(kruskal(edges, 4)).toBe(3);
});
