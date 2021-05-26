const Tree = require('../models/tree');

module.exports = huffman;

function huffman(alphabet) {
  if (alphabet === null) return null;
  const sortedAlphabet = alphabet.sort((a, b) => a.weight - b.weight);
  const sortedAlphabetWithTreeNodes = sortedAlphabet.map((c) => {
    return { ...c, tree: new Tree(c.character) };
  });
  const firstQueue = sortedAlphabetWithTreeNodes;
  const secondQueue = [];

  while (firstQueue.length + secondQueue.length > 1) {
    const firstE = getMinElementFromQueues(firstQueue, secondQueue);
    const secondE = getMinElementFromQueues(firstQueue, secondQueue);

    secondQueue.push(getMergedCharacter(firstE, secondE));
  }

  const huffmanTree = firstQueue.length > 0 ? firstQueue[0].tree : secondQueue[0].tree;
  return huffmanTree.getNodesMap();
}

function getMinElementFromQueues(firstQueue, secondQueue) {
  if (firstQueue.length === 0) return secondQueue.shift();
  if (secondQueue.length === 0) return firstQueue.shift();
  return firstQueue[0].weight < secondQueue[0].weight ? firstQueue.shift() : secondQueue.shift();
}

function getMergedCharacter(character1, character2) {
  return {
    character: character1.character + character2.character,
    weight: character1.weight + character2.weight,
    tree: character2.tree.merge(character1.tree),
  };
}
