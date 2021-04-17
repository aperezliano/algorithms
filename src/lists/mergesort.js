module.exports = mergeSort;

function mergeSort(list) {
  if (list === null || list.length <= 1) return list;
  if (list.length === 2) return list[1] < list[0] ? [list[1], list[0]] : list;

  const half = Math.floor(list.length / 2);
  return merge(mergeSort(list.slice(0, half)), mergeSort(list.slice(half)));
}

function merge(firstHalf, secondHalf) {
  const result = [];
  let i = 0,
    j = 0;
  while (i < firstHalf.length && j < secondHalf.length) {
    result.push(firstHalf[i] <= secondHalf[j] ? firstHalf[i++] : secondHalf[j++]);
  }
  return result.concat(firstHalf.slice(i)).concat(secondHalf.slice(j));
}
