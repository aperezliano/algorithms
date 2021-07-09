const HashTableChaining = require('../chaining');
const HashTableOpenAddressing = require('../open_addressing');

it.each([[HashTableChaining], [HashTableOpenAddressing]])('adds 1 element', (HashTable) => {
  const hashTable = new HashTable();
  hashTable.add('foo', 1);
  expect(hashTable.get('foo')).toBe(1);
});

it.each([[HashTableChaining], [HashTableOpenAddressing]])('adds 2 different elements', (HashTable) => {
  const hashTable = new HashTable();
  hashTable.add('foo', 1);
  hashTable.add('baz', 2);
  expect(hashTable.get('foo')).toBe(1);
  expect(hashTable.get('baz')).toBe(2);
});

it.each([[HashTableChaining], [HashTableOpenAddressing]])('returns null for non existing key', (HashTable) => {
  const hashTable = new HashTable();
  expect(hashTable.get('foo')).toBeNull();
});

it.each([[HashTableChaining], [HashTableOpenAddressing]])(
  'returns null for non existing key with same hash as another',
  (HashTable) => {
    const hashTable = new HashTable();
    hashTable.add('foo', 1);
    expect(hashTable.get('oof')).toBeNull();
  }
);

it.each([[HashTableChaining], [HashTableOpenAddressing]])('adds 2 elements with same hash', (HashTable) => {
  const hashTable = new HashTable();
  hashTable.add('foo', 1);
  hashTable.add('oof', 2);
  expect(hashTable.get('foo')).toBe(1);
  expect(hashTable.get('oof')).toBe(2);
});

it.each([[HashTableChaining], [HashTableOpenAddressing]])(
  'throws error when inserting same element twice',
  (HashTable) => {
    const hashTable = new HashTable();
    hashTable.add('foo', 1);
    expect(() => hashTable.add('foo', 2)).toThrow();
  }
);
