module.exports = reduceInput;

/**
 *
 * @param {[Number,Number][]} assignments
 */
function reduceInput(assignments) {
  let reduction = [...assignments];
  let isReduced;
  do {
    isReduced = false;
    const NegatedClauses = new Map();
    const RegularClauses = new Map();
    for (let i = 0; i < reduction.length; i++) {
      if (reduction[i][0] > 0) addClauseToMap(reduction[i][0], i, RegularClauses);
      else addClauseToMap(reduction[i][0], i, NegatedClauses);

      if (reduction[i][1] > 0) addClauseToMap(reduction[i][1], i, RegularClauses);
      else addClauseToMap(reduction[i][1], i, NegatedClauses);
    }
    isReduced =
      reduceClauses(RegularClauses, NegatedClauses, isReduced, reduction) ||
      reduceClauses(NegatedClauses, RegularClauses, isReduced, reduction);

    reduction = reduction.filter((e) => e !== null);
  } while (isReduced);
  return reduction;
}

function reduceClauses(clauses1, clauses2, isReduced, reduction) {
  for (let [clause, indexes] of clauses1) {
    if (!clauses2.has(clause * -1)) {
      isReduced = true;
      indexes.forEach((i) => (reduction[i] = null));
    }
  }
  return isReduced;
}

/**
 *
 * @param {Number} clause
 * @param {Number} index
 * @param {Map<Number, []>} RegularClauses
 */
function addClauseToMap(clause, index, ClausesMap) {
  if (ClausesMap.has(clause)) ClausesMap.get(clause).push(index);
  else ClausesMap.set(clause, [index]);
}
