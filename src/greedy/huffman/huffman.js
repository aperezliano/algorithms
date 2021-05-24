const Tree = require('../models/tree');

module.exports = huffman;

function huffman(characters) {
  if (characters === null) return null;

  const huffmanTree = huffmanRec(
    characters.map((c) => {
      return { ...c, tree: new Tree(c.character) };
    })
  );

  return huffmanTree.getNodesMap();
}

function huffmanRec(alphabet) {
  if (alphabet.length === 1) return alphabet[0].tree;
  const sortedalphabet = alphabet.sort((a, b) => a.weight - b.weight);
  const [character1, character2] = sortedalphabet.splice(0, 2);

  return huffmanRec(alphabet.concat([getMergedCharacter(character1, character2)]));
}

function getMergedCharacter(character1, character2) {
  return {
    character: character1.character + character2.character,
    weight: character1.weight + character2.weight,
    tree: character2.tree.merge(character1.tree),
  };
}
