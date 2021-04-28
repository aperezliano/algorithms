const fs = require('fs');

const stronglyConnected = require('../strongly_connected');
const Graph = require('../../../models/graph');

it('returns null with a null graph', () => {
  expect(stronglyConnected(null)).toBeNull();
});

it('returns an empty array with an empty graph', () => {
  expect(stronglyConnected(new Graph(true))).toEqual([]);
});

it('returns the array[3, 1] with the graph [1->2, 2->3, 3->1, 3-> 4]', () => {
  const graph = new Graph(true);
  graph.addEdge(1, 2);
  graph.addEdge(2, 3);
  graph.addEdge(3, 1);
  graph.addEdge(3, 4);
  expect(stronglyConnected(graph)).toEqual([1, 3]);
});

it('Test case 1 -> Sol: 3,3,3', () => {
  const graph = new Graph(true);
  graph.addEdge(1, 4);
  graph.addEdge(2, 8);
  graph.addEdge(3, 6);
  graph.addEdge(4, 7);
  graph.addEdge(5, 2);
  graph.addEdge(6, 9);
  graph.addEdge(7, 1);
  graph.addEdge(8, 5);
  graph.addEdge(8, 6);
  graph.addEdge(9, 7);
  graph.addEdge(9, 3);
  expect(stronglyConnected(graph)).toEqual([3, 3, 3]);
});

it('Test case 2 -> Sol: 3,3,2', () => {
  const graph = new Graph(true);
  graph.addEdge(1, 2);
  graph.addEdge(2, 6);
  graph.addEdge(2, 3);
  graph.addEdge(2, 4);
  graph.addEdge(3, 1);
  graph.addEdge(3, 4);
  graph.addEdge(4, 5);
  graph.addEdge(5, 4);
  graph.addEdge(6, 5);
  graph.addEdge(6, 7);
  graph.addEdge(7, 6);
  graph.addEdge(7, 8);
  graph.addEdge(8, 5);
  graph.addEdge(8, 7);
  expect(stronglyConnected(graph)).toEqual([2, 3, 3]);
});

it('Test case 3 -> Sol: 3,1,3,1', () => {
  const graph = new Graph(true);
  graph.addEdge(1, 2);
  graph.addEdge(2, 3);
  graph.addEdge(3, 1);
  graph.addEdge(3, 4);
  graph.addEdge(5, 4);
  graph.addEdge(6, 4);
  graph.addEdge(8, 6);
  graph.addEdge(6, 7);
  graph.addEdge(7, 8);
  expect(stronglyConnected(graph)).toEqual([1, 3, 1, 3]);
});

it('Test case 4 -> Sol: 7,1', () => {
  const graph = new Graph(true);
  graph.addEdge(1, 2);
  graph.addEdge(2, 3);
  graph.addEdge(3, 1);
  graph.addEdge(3, 4);
  graph.addEdge(5, 4);
  graph.addEdge(6, 4);
  graph.addEdge(8, 6);
  graph.addEdge(6, 7);
  graph.addEdge(7, 8);
  graph.addEdge(4, 3);
  graph.addEdge(4, 6);
  expect(stronglyConnected(graph)).toEqual([7, 1]);
});

it('Test case 5 -> Sol: 6,3,2,1', () => {
  const graph = new Graph(true);
  graph.addEdge(1, 2);
  graph.addEdge(2, 3);
  graph.addEdge(2, 4);
  graph.addEdge(2, 5);
  graph.addEdge(3, 6);
  graph.addEdge(4, 5);
  graph.addEdge(4, 7);
  graph.addEdge(5, 2);
  graph.addEdge(5, 6);
  graph.addEdge(5, 7);
  graph.addEdge(6, 3);
  graph.addEdge(6, 8);
  graph.addEdge(7, 8);
  graph.addEdge(7, 10);
  graph.addEdge(8, 7);
  graph.addEdge(9, 7);
  graph.addEdge(10, 9);
  graph.addEdge(10, 11);
  graph.addEdge(11, 12);
  graph.addEdge(12, 10);
  expect(stronglyConnected(graph)).toEqual([6, 2, 3, 1]);
});

// Huge test case -> To run it: yarn run:sccs
