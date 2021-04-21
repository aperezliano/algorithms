module.exports = inversions;

function inversions(list) {
  if (list === null || list.length <= 1) return [list, 0];
  if (list.length === 2) return list[1] < list[0] ? [[list[1], list[0]], 0] : [list, 0];

  const half = Math.floor(list.length / 2);
  const [leftSorted, leftInversions] = inversions(list.slice(0, half));
  const [rightSorted, rightInversions] = inversions(list.slice(half));
  const [mergeSorted, splitInversions] = mergeAndCount(leftSorted, rightSorted);
  return [mergeSorted, leftInversions + rightInversions + splitInversions];
}

function mergeAndCount(firstHalf, secondHalf) {
  const result = [];
  let i = 0,
    j = 0,
    inversions = 0;
  while (i < firstHalf.length && j < secondHalf.length) {
    let currentMin = null;
    if (firstHalf[i] <= secondHalf[j]) {
      currentMin = firstHalf[i++];
    } else {
      currentMin = secondHalf[j++];
      inversions += firstHalf.length - i;
    }
    result.push(currentMin);
  }
  return [result.concat(firstHalf.slice(i)).concat(secondHalf.slice(j)), inversions];
}
