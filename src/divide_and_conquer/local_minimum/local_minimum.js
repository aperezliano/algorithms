// https://www.baeldung.com/cs/local-minimum-in-n-x-n-matrix

module.exports = findLocalMinimum;

function findLocalMinimum(matrix) {
  if (matrix === null) return null;
  const middle = matrix.length / 2;
  const minCell = { x: null, y: null, value: null };
}

function getMinCell(x, y, matrix, minCell) {
  if (matrix[i][y] > minCell.value) return minCell;
  return {
    x: i,
    y: middle,
    value: matrix[i][y],
  };
}

function getMinCellInMiddle(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    if (i === middle) {
      matrix[i][middle].forEach((e, j) => {});
    }
  }
}
