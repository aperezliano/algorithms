module.exports = quicksort;

function quicksort(array) {
  if (array === null) return null;
  if (array.length <= 1) return array;

  const pivot = array[0];
  let i = 1;

  for (let j = 1; j < array.length; j++) {
    if (array[j] < pivot) {
      [array[i], array[j]] = [array[j], array[i]];
      i++;
    }
  }
  [array[0], array[i - 1]] = [array[i - 1], array[0]];

  return [...quicksort(array.slice(0, i - 1)), pivot, ...quicksort(array.slice(i))];
}
