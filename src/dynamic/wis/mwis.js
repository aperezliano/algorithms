module.exports = mwis;

function mwis(graph) {
  let A = new Array(graph.length + 1);
  A[0] = 0;
  A[1] = graph[0];

  for (let i = 1; i < graph.length; i++) {
    A[i + 1] = Math.max(A[i], A[i - 1] + graph[i]);
  }

  let S = [];
  let i = A.length - 1;
  while (i >= 1) {
    if (A[i - 1] >= A[i - 2] + graph[i - 1]) {
      i -= 1;
    } else {
      S.unshift(i - 1);
      i -= 2;
    }
  }
  return S;
}
