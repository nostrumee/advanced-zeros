module.exports = function getZerosCount(number, base) {
  let multipliers = {};
  let multiplier = 2;
  let baseValue = base;
  let sqrt = Math.sqrt(base);
  let result = Infinity;

  while (baseValue > 1 && multiplier <= sqrt) {
    if (baseValue % multiplier === 0) {
      if (multipliers[multiplier] === undefined) {
        multipliers[multiplier] = 1;
      } else {
        multipliers[multiplier]++;
      }
      baseValue /= multiplier;
    } else if (multiplier === 2) {
      multiplier++;
    } else {
      multiplier += 2;
    }
  }

  if (baseValue != 1) {
    multipliers[baseValue] = 1;
  }

  for (key in multipliers) {
    let divisor = key;
    let currentResult = 0;

    while (number / divisor > 1) {
      currentResult += Math.floor(number / divisor);
      divisor *= key;
    }

    currentResult = Math.floor(currentResult / multipliers[key]);

    result = Math.min(currentResult, result);
  }

  return result;
}