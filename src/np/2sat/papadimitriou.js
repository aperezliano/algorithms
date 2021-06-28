module.exports = papadimitriou;
const X = new Map();

/**
 *
 * @param {[Number,Number][]} assignments
 */
function papadimitriou(assignments) {
  for (let i = 0; i < Math.log2(assignments.length); i++) {
    setInitialAssignments(assignments);
    for (let j = 0; j < 2 * assignments.length ** 2; j++) {
      if (assignments.every(getAssignmentValue)) return true;
      const unsatisfied = assignments.filter((clauses) => !getAssignmentValue(clauses));
      const randomUnsatisfiedAssignment = unsatisfied[Math.round(Math.random() * unsatisfied.length)] || unsatisfied[0];
      const randomClause = randomUnsatisfiedAssignment[Math.round(Math.random())];
      X.set(randomClause, !X.get(randomClause));
    }
  }
  return false;
}

function setInitialAssignments(assignments) {
  X.clear();
  const clauses = new Set();
  assignments.forEach(([c1, c2]) => {
    clauses.add(c1);
    clauses.add(c2);
  });
  clauses.forEach((clause) => {
    if (clause > 0) X.set(clause, Math.random() > 0.5);
    else X.set(clause * -1, Math.random() > 0.5);
  });
}

function getAssignmentValue([clause1, clause2]) {
  return getValue(clause1) || getValue(clause2);
}

function getValue(clause) {
  const isPositive = clause > 0;
  return isPositive ? X.get(clause) : !X.get(clause * -1);
}
