const karatsuba = require('../karatsuba');

it('works with null inputs', () => {
  expect(karatsuba(null, null)).toEqual(null);
});

it('works with both inputs equal to 0', () => {
  expect(karatsuba(0, 0)).toEqual(0);
});

it('works with two small inputs', () => {
  let a = 123456789,
    b = 987654321;
  expect(karatsuba(a, b)).toEqual(121932631112635260);
});

it('works with two big inputs', () => {
  let a = 3141592653589793238462643383279502884197169399375105820974944592,
    b = 2718281828459045235360287471352662497757247093699959574966967627;
  expect(karatsuba(a, b)).toEqual(8.539734222673568e126);
});
