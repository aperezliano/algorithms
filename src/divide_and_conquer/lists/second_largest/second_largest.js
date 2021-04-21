module.exports = secondLargest;

function secondLargest(array) {
  if (array === null) return null;

  let largest = array[0];
  return array.reduce((acc, number) => {
    if (number > largest) {
      acc = largest;
      largest = number;
    } else if (number < largest && number > acc) {
      acc = number;
    }
    return acc;
  }, null);
}
