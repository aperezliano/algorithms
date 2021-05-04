const Heap = require('../heap');

it('inserts elements', () => {
  const heap = new Heap();
  heap.insert(1);
  heap.insert(2);
  expect(heap.size()).toBe(2);
});

it('extracts min elements', () => {
  const heap = new Heap();
  heap.insert(1);
  heap.insert(2);
  expect(heap.extract()).toBe(1);
  expect(heap.extract()).toBe(2);
});

it('extracts min elements (more elements)', () => {
  const heap = new Heap();
  heap.insert(1);
  heap.insert(7);
  heap.insert(3);
  heap.insert(2);
  heap.insert(8);
  heap.insert(5);
  heap.insert(4);
  heap.insert(9);
  heap.insert(6);

  for (let i = 1; i < 10; i++) {
    expect(heap.extract()).toBe(i);
  }
});

it('extracts max elements', () => {
  const heap = new Heap(false);
  heap.insert(1);
  heap.insert(2);
  expect(heap.extract()).toBe(2);
  expect(heap.extract()).toBe(1);
});

it('extracts max elements (more elements)', () => {
  const heap = new Heap(false);
  heap.insert(1);
  heap.insert(7);
  heap.insert(3);
  heap.insert(2);
  heap.insert(8);
  heap.insert(5);
  heap.insert(4);
  heap.insert(9);
  heap.insert(6);

  for (let i = 9; i > 0; i--) {
    expect(heap.extract()).toBe(i);
  }
});
