import { getPrecision, parseDate, Precision } from "./period";

const compareDates = (
  actual: Date,
  year: number,
  month?: number,
  date?: number
) => {
  const expected = new Date(year, month || 0, date || 1);
  expect(actual.getFullYear()).toBe(expected.getFullYear());
  expect(actual.getMonth()).toBe(expected.getMonth());
  expect(actual.getDate()).toBe(expected.getDate());
};

describe("parseDate", () => {
  // eslint-disable-next-line jest/expect-expect
  it("should parse year date", () => {
    compareDates(parseDate("2019"), 2019);
    compareDates(parseDate("1920"), 1920);
  });

  // eslint-disable-next-line jest/expect-expect
  it("should parse year-month date", () => {
    compareDates(parseDate("2019-02"), 2019, 1);
    compareDates(parseDate("2019-3"), 2019, 2);
  });

  // eslint-disable-next-line jest/expect-expect
  it("should parse year-month-day date", () => {
    compareDates(parseDate("2019-02-09"), 2019, 1, 9);
    compareDates(parseDate("2019-3-15"), 2019, 2, 15);
  });

  // eslint-disable-next-line jest/expect-expect
  it("should parse 'Present'", () => {
    compareDates(
      parseDate("Present"),
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    );
  });
});

describe("getPrecision", () => {
  it("should compute precision", () => {
    expect(getPrecision("2019")).toBe(Precision.YEAR);
    expect(getPrecision("2019-10")).toBe(Precision.MONTH);
    expect(getPrecision("2019-10-10")).toBe(Precision.DATE);
  });
});
