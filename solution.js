function solution(D) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const result = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };
  const hasValue = {};

  // Helper: Convert date to weekday name
  const getDayName = (dateStr) => {
    const d = new Date(dateStr);
    return days[(d.getDay() + 6) % 7]; // JS: Sunday=0, shift to make Monday=0
  };

  // Step 1: Sum values by weekday
  for (const [date, value] of Object.entries(D)) {
    const day = getDayName(date);
    result[day] += value;
    hasValue[day] = true;
  }

  // Step 2: Find all indices with actual values
  const knownIndices = days
    .map((d, i) => (hasValue[d] ? i : -1))
    .filter((i) => i !== -1);

  // Fill before first known day
  const firstIdx = knownIndices[0];
  for (let i = 0; i < firstIdx; i++) {
    result[days[i]] = result[days[firstIdx]];
    hasValue[days[i]] = true;
  }

  // Fill after last known day
  const lastIdx = knownIndices[knownIndices.length - 1];
  for (let i = lastIdx + 1; i < 7; i++) {
    result[days[i]] = result[days[lastIdx]];
    hasValue[days[i]] = true;
  }

  // Interpolate between known days
  for (let i = 0; i < knownIndices.length - 1; i++) {
    const start = knownIndices[i];
    const end = knownIndices[i + 1];
    const gap = end - start;
    const startVal = result[days[start]];
    const endVal = result[days[end]];

    for (let j = start + 1; j < end; j++) {
      const ratio = (j - start) / gap;
      result[days[j]] = Math.round(startVal + ratio * (endVal - startVal));
      hasValue[days[j]] = true;
    }
  }

  return result;
}

/* ======================
   ✅ Unit Tests Section
   ====================== */
const assert = require('assert');

// Test 1: Normal Case
let input = {
  '2020-01-01': 4,
  '2020-01-02': 4,
  '2020-01-03': 6,
  '2020-01-04': 8,
  '2020-01-05': 2,
  '2020-01-06': -6,
  '2020-01-07': 2,
  '2020-01-08': -2
};
let expected = { Mon: -6, Tue: 2, Wed: 2, Thu: 4, Fri: 6, Sat: 8, Sun: 2 };
assert.deepStrictEqual(solution(input), expected);

// Test 2: Missing Thu & Fri (interpolation)
input = {
  '2020-01-01': 6,
  '2020-01-04': 12,
  '2020-01-05': 14,
  '2020-01-06': 2,
  '2020-01-07': 4
};
expected = { Mon: 2, Tue: 4, Wed: 6, Thu: 8, Fri: 10, Sat: 12, Sun: 14 };
assert.deepStrictEqual(solution(input), expected);

// Test 3: Missing starting days (fill before first known)
input = {
  '2020-01-01': 2, // Wed
  '2020-01-05': 10 // Sun
};
expected = { Mon: 2, Tue: 2, Wed: 2, Thu: 4, Fri: 6, Sat: 8, Sun: 10 };
assert.deepStrictEqual(solution(input), expected);

// Test 4: Missing ending days (fill after last known)
input = {
  '2020-01-01': 5, // Wed
  '2020-01-03': 15 // Fri
};
expected = { Mon: 5, Tue: 5, Wed: 5, Thu: 10, Fri: 15, Sat: 15, Sun: 15 };
assert.deepStrictEqual(solution(input), expected);

console.log("✅ All tests passed!");
