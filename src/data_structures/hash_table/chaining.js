class HashTableChaining {
  #size;
  #buckets;

  constructor(size = 10) {
    this.#buckets = [];
    this.#size = size;
  }

  add(key, value) {
    this.#validateKey(key);
    const hashKey = this.#computeHash(key);

    // Hash key not present (no collisions)
    if (this.#buckets[hashKey] == undefined) {
      this.#buckets[hashKey] = {};
    }

    // Element already present
    const chain = this.#buckets[hashKey];
    if (chain.hasOwnProperty(key)) {
      throw 'Element already present';
    }

    chain[key] = value;
  }

  get(key) {
    this.#validateKey(key);
    const hashKey = this.#computeHash(key);
    const chain = this.#buckets[hashKey];

    if (chain == undefined) {
      return null;
    }

    if (chain.hasOwnProperty(key)) {
      return chain[key];
    }

    return null;
  }

  #computeHash(data) {
    var total = 0;
    for (var i = 0; i < data.length; ++i) {
      total += data.charCodeAt(i);
    }
    return total % this.#size;
  }

  #validateKey(key) {
    const keyType = typeof key;
    if (keyType !== 'number' && keyType !== 'string') {
      throw 'Only number and string keys allowed';
    }
  }
}

module.exports = HashTableChaining;
