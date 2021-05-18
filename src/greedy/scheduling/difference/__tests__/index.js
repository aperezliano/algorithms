const fs = require('fs');
const difference = require('../difference');

it('works with 2 different jobs', () => {
  const INPUT_JOBS = [
    { weight: 3, length: 5 },
    { weight: 1, length: 2 },
  ];
  expect(difference(INPUT_JOBS)).toEqual(23);
});

it('works with 3 jobs (duplications)', () => {
  const INPUT_JOBS = [
    { weight: 3, length: 5 },
    { weight: 1, length: 2 },
    { weight: 2, length: 3 },
  ];
  expect(difference(INPUT_JOBS)).toEqual(41);
});

it('works with 4 jobs', () => {
  const INPUT_JOBS = [
    { weight: 2, length: 1 },
    { weight: 3, length: 2 },
    { weight: 4, length: 3 },
    { weight: 2, length: 3 },
  ];
  expect(difference(INPUT_JOBS)).toEqual(57);
});

it('works with an input list of jobs', () => {
  const INPUT_JOBS = 'src/greedy/scheduling/.inputs/jobs.txt';
  let jobs;
  try {
    jobs = fs
      .readFileSync(INPUT_JOBS, 'utf8')
      .split('\n')
      .map((e) => {
        const [weight, length] = e.split(' ').map((e) => parseInt(e));
        return { weight, length };
      });
  } catch (err) {
    console.error(err);
  }
  expect(difference(jobs)).toEqual(69119377652);
});
