module.exports = matchingIndex;

function matchingIndex(array, offset = 0) {
  if (array === null || array.length === 0) return null;

  const middle = Math.floor(array.length / 2);
  if (array.length === 1) return array[0] === middle + offset ? middle + offset : null;
  if (array[middle] <= middle + offset) return matchingIndex(array.slice(middle), middle + offset);
  return matchingIndex(array.slice(0, middle), offset);
}
