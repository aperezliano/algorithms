module.exports = karatsuba;

// Issue with numbers bigger than MAX_SAFE_INTEGER
function karatsuba(x, y) {
  if (x === null || y === null) return null;
  if (x < 10 && y < 10) return x * y;

  let maxLength = Math.max(x.toString().length, y.toString().length);
  let m = Math.round(maxLength / 2);

  let xHigh = Math.floor(x / Math.pow(10, m));
  let yHigh = Math.floor(y / Math.pow(10, m));
  let xLow = x % Math.pow(10, m);
  let yLow = y % Math.pow(10, m);

  let a = karatsuba(xHigh, yHigh);
  let d = karatsuba(xLow, yLow);
  let e = karatsuba(xLow + xHigh, yLow + yHigh) - a - d;

  return a * Math.pow(10, m * 2) + e * Math.pow(10, m) + d;
}
