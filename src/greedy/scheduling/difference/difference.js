module.exports = difference;

function difference(jobs) {
  const sortedJobs = jobs.sort((a, b) => {
    const differenceA = a.weight - a.length;
    const differenceB = b.weight - b.length;
    if (differenceA !== differenceB) return differenceB - differenceA;
    return a.weight > b.weight ? -1 : 1;
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
