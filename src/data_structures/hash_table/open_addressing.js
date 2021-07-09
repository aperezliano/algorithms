class HashTableOpenAddressing {
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
      this.#buckets[hashKey][key] = value;
      return;
    }

    // Element present
    if (this.#buckets[hashKey].hasOwnProperty(key)) {
      throw 'Element already present';
    }

    // Element not present but the slot is taken (Linear probing)
    let newKey = hashKey;
    do {
      newKey = (hashKey + 1) % this.#size;
      if (this.#buckets[newKey] == undefined) {
        this.#buckets[newKey] = {};
        this.#buckets[newKey][key] = value;
        return;
      }
    } while (newKey !== hashKey);
  }

  get(key) {
    this.#validateKey(key);
    const hashKey = this.#computeHash(key);

    // Element not present
    if (this.#buckets[hashKey] == undefined) {
      return null;
    }

    // Element present in its bucket
    if (this.#buckets[hashKey].hasOwnProperty(key)) {
      return this.#buckets[hashKey][key];
    }

    // The slot is taken (Linear probing)
    let newKey = hashKey;
    do {
      newKey = (newKey + 1) % this.#size;
      if (this.#buckets?.[newKey]?.[key] != undefined) {
        return this.#buckets[newKey][key];
      }
    } while (newKey !== hashKey);

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

module.exports = HashTableOpenAddressing;
