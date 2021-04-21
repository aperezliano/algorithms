module.exports = karatsuba;

function karatsuba(x, y) {
  if (x === null || y === null) return null;
  if (x < 10n && y < 10n) return x * y;

  let maxLength = Math.max(x.toString().length, y.toString().length);
  let m = BigInt(Math.floor(maxLength / 2));

  let xHigh = x / 10n ** m;
  let yHigh = y / 10n ** m;
  let xLow = x % 10n ** m;
  let yLow = y % 10n ** m;

  let a = karatsuba(xHigh, yHigh);
  let d = karatsuba(xLow, yLow);
  let e = karatsuba(xLow + xHigh, yLow + yHigh) - a - d;

  return a * 10n ** (m * 2n) + e * 10n ** m + d;
}
