module.exports = knapsack;

function knapsack(items, maxWeight) {
  if (items === null || maxWeight === null) return null;

  const A = buildItemsMatrix(items, maxWeight);

  const optimalValue = A[items.length][maxWeight];
  return { optimalValue, includedItems: getIncludedItems(A, items, maxWeight) };
}

function buildItemsMatrix(items, maxWeight) {
  let A = [];
  A[0] = new Array(maxWeight + 1).fill(0);

  for (let item = 0; item < items.length; item++) {
    A[item + 1] = new Array(maxWeight + 1).fill(0);

    for (let weight = 0; weight <= maxWeight; weight++) {
      A[item + 1][weight] =
        items[item].weight > weight
          ? A[item][weight]
          : Math.max(A[item][weight], A[item][weight - items[item].weight] + items[item].value);
    }
  }

  return A;
}

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
