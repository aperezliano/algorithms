module.exports = ratio;

function ratio(jobs) {
  const sortedJobs = jobs.sort((a, b) => {
    const ratioA = a.weight / a.length;
    const ratioB = b.weight / b.length;
    return ratioB - ratioA;
  });
  return sortedJobs.reduce(
    (acc, e) => {
      return {
        result: acc.result + (acc.length + e.length) * e.weight,
        length: acc.length + e.length,
      };
    },
    { result: 0, length: 0 }
  ).result;
}
