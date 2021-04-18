const karatsuba = require('../karatsuba');

it('works with null inputs', () => {
  expect(karatsuba(null, null)).toEqual(null);
});

it('works with both inputs equal to 0', () => {
  expect(karatsuba(0, 0)).toEqual(0);
});

it('works with two small inputs', () => {
  let a = 123456789n,
    b = 987654321n;
  expect(karatsuba(a, b)).toEqual(121932631112635269n);
});

it('works with two big inputs', () => {
  let a = 3141592653589793238462643383279502884197169399375105820974944592n,
    b = 2718281828459045235360287471352662497757247093699959574966967627n;
  expect(karatsuba(a, b)).toEqual(
    8539734222673567065463550869546574495034888535765114961879601127067743044893204848617875072216249073013374895871952806582723184n
  );
});
