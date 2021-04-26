module.exports = ithOrderStatistic;

function ithOrderStatistic(array, i) {
  if (array === null || array.length === 0 || i > array.length) return null;
  if (array.length === 1) return array[0];

  let [partitionArray, pivotPosition] = partition(array);
  if (pivotPosition > i) return ithOrderStatistic(partitionArray.slice(0, pivotPosition), i);
  if (pivotPosition < i) return ithOrderStatistic(partitionArray.slice(pivotPosition + 1), i - (pivotPosition + 1));
  return partitionArray[pivotPosition];
}

function partition(array) {
  const copyArray = [...array];
  // random pivot selection
  const pivotPosition = Math.floor(Math.random() * array.length);
  const pivot = copyArray[pivotPosition];
  [copyArray[0], copyArray[pivotPosition]] = [copyArray[pivotPosition], copyArray[0]];
  let i = 1;
  for (let j = 1; j < copyArray.length; j++) {
    if (copyArray[j] < pivot) {
      [copyArray[i], copyArray[j]] = [copyArray[j], copyArray[i]];
      i++;
    }
  }
  [copyArray[0], copyArray[i - 1]] = [copyArray[i - 1], copyArray[0]];
  return [copyArray, i - 1];
}
