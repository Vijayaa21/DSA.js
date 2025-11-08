# 🧮 Weekday Data Aggregator (JavaScript)

This project implements a robust JavaScript algorithm that **aggregates integer values by weekday (Mon–Sun)** given an input object with date keys (`YYYY-MM-DD` format), and **fills missing weekdays using smart interpolation**. It includes self-contained unit tests for validation.

---

## 🚀 Problem Statement

Given an input dictionary (object) where:
- **Keys** are strings representing dates (`YYYY-MM-DD`).
- **Values** are integers.

Your task:
1. Convert each date to its corresponding day of week (Mon to Sun).
2. Sum values for each weekday.
3. Fill missing weekdays by interpolation:
   - **Between known weekdays**: Use the average of previous and next known days.
   - **Before the first known day**: Reuse the first known value.
   - **After the last known day**: Reuse the last known value.

---

## 🧠 Solution Approach

### 1. Date-to-Weekday Conversion

- Each date is parsed using JavaScript’s `Date` object.
- Mapped to weekday indexes so that Monday = 0, ..., Sunday = 6.

### 2. Aggregation by Weekday

- All values for each weekday are summed into an output object:
{ Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 }

text

### 3. Interpolation for Missing Days

- **Inner gaps**: Fill with mean of previous and next known weekday values.
- **Edge gaps**:
- Before first known: Fill using the first known value.
- After last known: Fill using the last known value.

---

## 💻 Example

**Input:**
{
"2020-01-01": 4,
"2020-01-02": 4,
"2020-01-03": 6,
"2020-01-04": 8,
"2020-01-05": 2,
"2020-01-06": -6,
"2020-01-07": 2,
"2020-01-08": -2
}

text

**Output:**
{
Mon: -6,
Tue: 2,
Wed: 2,
Thu: 4,
Fri: 6,
Sat: 8,
Sun: 2
}


---

## ✅ Usage and Unit Tests

const result = solution({
"2020-01-01": 4,
"2020-01-02": 4,
"2020-01-03": 6,
"2020-01-04": 8,
"2020-01-05": 2,
"2020-01-06": -6,
"2020-01-07": 2,
"2020-01-08": -2
});

// Unit Test Example
function assertEquals(a, b) {
if (JSON.stringify(a) !== JSON.stringify(b)) throw new Error("Test failed");
}

assertEquals(result, {
Mon: -6, Tue: 2, Wed: 2, Thu: 4, Fri: 6, Sat: 8, Sun: 2
});
