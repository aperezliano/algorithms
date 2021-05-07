const Heap = require('../heap');

module.exports = median;
let hHigh = new Heap();
let hLow = new Heap(false);

function* median() {
  hHigh = new Heap();
  hLow = new Heap(false);
  let number = yield;
  while (true) {
    insertNumberInHeaps(number);
    balanceHeaps();

    number = yield getMedian();
  }
}

function insertNumberInHeaps(number) {
  if (!hHigh.peek() || number > hHigh.peek()) {
    hHigh.insert(number);
  } else {
    hLow.insert(number);
  }
}

function balanceHeaps() {
  if (hLow.size() - hHigh.size() > 1) {
    hHigh.insert(hLow.extract());
  }
  if (hHigh.size() - hLow.size() > 1) {
    hLow.insert(hHigh.extract());
  }
}

function getMedian() {
  if ((hLow.size() + hHigh.size()) % 2 === 0) {
    return hLow.peek();
  }
  return hHigh.peek();
}
