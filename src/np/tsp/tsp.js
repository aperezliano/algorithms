module.exports = tsp;

function tsp(citiesCoords = []) {
  const A = new Map();

  A.set(`${citiesCoords[0].id}`, new Map().set(`${citiesCoords[0].id}`, 0));

  for (let m = 2; m < citiesCoords.length; m++) {
    const subCities = citiesCoords.slice(0, m);
    const S = perm(subCities);
    for (let s of S) {
      for (let i = 1; i < subCities.length; i++) {
        const indexJ = s.findIndex((e) => e.id === i);
        const SMinusJ = [...s];
        SMinusJ.splice(indexJ, 1);
        const j = citiesCoords[i];
        let minPath = Infinity;
        for (let k of SMinusJ) {
          let prevPath = A.get(arrayIdsToString(SMinusJ)) || new Map();
          prevPath = prevPath.get(`${k.id}`) ?? Infinity;
          minPath = Math.min(minPath, prevPath + getDistance(j, k));
        }
        if (A.has(arrayIdsToString(S))) {
          A.get(arrayIdsToString(S)).set(`${j.id}`, minPath);
        } else {
          A.set(arrayIdsToString(S), new Map().set(`${j.id}`, minPath));
        }
      }
    }
  }
  for (let j of A.get(A.size - 1).entries) {
    // return min
  }
}

function arrayIdsToString(array) {
  return array.map((e) => e.id).toString();
}

function getDistance(p1, p2) {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}

function perm(xs) {
  let ret = [];

  for (let i = 0; i < xs.length; i = i + 1) {
    let rest = perm(xs.slice(0, i).concat(xs.slice(i + 1)));

    if (!rest.length) {
      ret.push([xs[i]]);
    } else {
      for (let j = 0; j < rest.length; j = j + 1) {
        ret.push([xs[i]].concat(rest[j]));
      }
    }
  }
  return ret;
}
