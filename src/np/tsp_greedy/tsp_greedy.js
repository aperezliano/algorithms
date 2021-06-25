/**
 *
 * @param {City[]} cities
 */

function tspGreedy(cities) {
  const pendingCities = [...cities];
  let travelLength = 0;
  let startingPoint = pendingCities.shift();
  while (pendingCities.length > 0) {
    const { v, i } = pendingCities.reduce(
      (acc, city, index) => {
        const distance = getDistance(startingPoint, city);
        return distance < acc.v ? { i: index, v: distance } : acc;
      },
      { v: Infinity, i: 0 }
    );
    travelLength += v;
    startingPoint = pendingCities.splice(i, 1)[0];
  }
  return travelLength;
}

function City(x, y) {
  return {
    x,
    y,
  };
}

function getDistance(p1, p2) {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}

module.exports = {
  tspGreedy,
  City,
};
