module.exports = quicksort;

function quicksort(array) {
  if (array === null) return null;
  if (array.length <= 1) return array;

  let [partitionArray, i, pivot] = partition(array);

  return [...quicksort(partitionArray.slice(0, i - 1)), pivot, ...quicksort(partitionArray.slice(i))];
}

function partition(array) {
  const copyArray = [...array];
  const pivot = copyArray[0];
  let i = 1;
  for (let j = 1; j < copyArray.length; j++) {
    if (copyArray[j] < pivot) {
      [copyArray[i], copyArray[j]] = [copyArray[j], copyArray[i]];
      i++;
    }
  }
  [copyArray[0], copyArray[i - 1]] = [copyArray[i - 1], copyArray[0]];
  return [copyArray, i, pivot];
}
