module.exports = knapsack;

function knapsack(items, maxWeight) {
  if (items === null || maxWeight === null) return null;

  const A = buildItemsMatrix(items, maxWeight);

  const optimalValue = A[1][maxWeight];
  return optimalValue;
}

function buildItemsMatrix(items, maxWeight) {
  let A = [];
  A[0] = new Array(maxWeight + 1).fill(0);

  for (let item = 0; item < items.length; item++) {
    A[1] = new Array(maxWeight + 1).fill(0);

    for (let weight = 0; weight <= maxWeight; weight++) {
      A[1][weight] =
        items[item].weight > weight
          ? A[0][weight]
          : Math.max(A[0][weight], A[0][weight - items[item].weight] + items[item].value);
    }
    A[0] = [...A[1]];
  }

  return A;
}

// Not used as we just care about the optimal value, left for reviewing purposes
function getIncludedItems(A, items, maxWeight) {
  const selectedItems = [];
  let weight = maxWeight;
  let item = items.length;
  while (item > 0) {
    if (A[item][weight] === A[item - 1][weight - items[item - 1].weight] + items[item - 1].value) {
      selectedItems.unshift(items[item - 1]);
      weight -= items[item - 1].weight;
    }
    item--;
  }
  return selectedItems;
}
