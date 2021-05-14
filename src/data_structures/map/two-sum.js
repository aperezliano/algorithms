module.exports = twoSum;

function twoSum(numbers) {
  // Not using maps as it takes ages
  let result = 0,
    i = 0,
    j = numbers.length - 1;
  while (i < j) {
    if (numbers[i] + numbers[j] < -10000) {
      i++;
      continue;
    }
    if (numbers[i] + numbers[j] > 10000) {
      j--;
      continue;
    }
    result++;
    j--;
  }
  return result;
}
