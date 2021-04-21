module.exports = unimodalMax;

function unimodalMax(array) {
  if (array === null) return null;
  if (array.length <= 1) return array[0] || null;

  const middle = Math.floor(array.length / 2);
  return array[middle - 1] < array[middle] ? unimodalMax(array.slice(middle)) : unimodalMax(array.slice(0, middle));
}
