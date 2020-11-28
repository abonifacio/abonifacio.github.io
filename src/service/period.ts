export enum Precision {
  YEAR = 1,
  MONTH = 2,
  DATE = 3,
}

const DATE_REGEX = /^(\d{4})(?:-(\d{1,2}))?(?:-(\d{1,2}))?$/;

function getDateParts(date: string): string[] {
  const matches = DATE_REGEX.exec(date);
  if (!matches || matches.length < 2) {
    throw new Error(`Cannot parse date: ${date}`);
  }
  return matches.slice(1).filter((it) => it !== undefined);
}

function dateArgs(date: string): [number, number, number] {
  const dateParts = getDateParts(date);
  return [
    parseInt(dateParts[0], 10),
    dateParts[1] ? parseInt(dateParts[1], 10) - 1 : 0,
    dateParts[2] ? parseInt(dateParts[2], 10) : 1,
  ];
}

export function getPrecision(date: string): Precision {
  if (date.toLowerCase() === "present") {
    return Precision.DATE;
  }
  const dateParts = getDateParts(date);
  return dateParts.length;
}

export function parseDate(date: string): Date {
  if (date.toLowerCase() === "present") {
    return new Date();
  }
  const [year, month, day] = dateArgs(date);
  return new Date(year, month, day);
}

function parseDateWithPrecision(date: string): [Date, Precision] {
  return [parseDate(date), getPrecision(date)];
}

export function parsePeriod(period: string): [Date, Precision][] {
  return period.split(" - ").map((d) => parseDateWithPrecision(d));
}

export function periodIncludes(period: string, date: string): boolean {
  const [[from], [to]] = parsePeriod(period);
  const realDate = parseDate(date);
  return (
    realDate.getTime() >= from.getTime() && realDate.getTime() <= to.getTime()
  );
}
