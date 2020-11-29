import { from } from "rxjs";
import { pluck, toArray } from "rxjs/operators";
import {
  computeLanguageStats,
  computeMacroExperienceDuration,
  computeMilestoneDuration,
} from "./stats";
import { parseDate, Precision } from "./period";

describe("computeExperienceDuration", () => {
  it("should compute durations for each milestone", async () => {
    const parentUntil: [Date, Precision] = [
      parseDate("2020-11"),
      Precision.MONTH,
    ];
    const milestones = from([
      { date: "2020-1" },
      { date: "2020-2" },
      { date: "2020-3 - 2020-6" },
    ]);
    const durations = await milestones
      .pipe(
        computeMilestoneDuration(parentUntil),
        pluck("durationInDays"),
        toArray()
      )
      .toPromise();
    expect(durations).toEqual([305, 274, 92]);
  });
});

describe("computeLanguageStats", () => {
  it("should take max duration for each tag", async () => {
    const tagsWithDurations = from([
      { tags: ["Java", "GO"], durationInDays: 305 },
      { tags: ["Python", "Java"], durationInDays: 274 },
      { tags: ["Javascript", "Python"], durationInDays: 92 },
    ]);
    const languageMap = await tagsWithDurations
      .pipe(computeLanguageStats(Math.max))
      .toPromise();
    expect(languageMap).toEqual({
      GO: 305,
      Java: 305,
      Javascript: 92,
      Python: 274,
    });
  });
  it("should sum duration for each milestone", async () => {
    const tagsWithDurations = from([
      { tags: ["Java", "GO"], durationInDays: 30 },
      { tags: ["Python", "Java"], durationInDays: 175 },
      { tags: ["Javascript", "Python"], durationInDays: 82 },
    ]);
    const languageMap = await tagsWithDurations
      .pipe(computeLanguageStats((a, b) => a + b))
      .toPromise();
    expect(languageMap).toEqual({
      GO: 30,
      Java: 205,
      Javascript: 82,
      Python: 257,
    });
  });
});
describe("computeMacroExperienceDuration", () => {
  it("should sum durations of each experience", async () => {
    const experiences = from([
      {
        period: "2020-1 - 2020-10",
        milestones: [
          { tags: ["Java", "GO"], date: "2020-1" },
          { tags: ["Python", "Java"], date: "2020-2" },
          { tags: ["Javascript", "Python"], date: "2020-3 - 2020-6" },
        ],
      },
      {
        period: "2020-2 - 2020-11",
        milestones: [{ tags: ["GO"], date: "2020-1" }],
      },
      {
        period: "2020-3 - 2020-6",
        milestones: [
          { tags: ["Javascript", "Python"], date: "2020-3 - 2020-6" },
        ],
      },
    ]);
    const languageMap = await experiences
      .pipe(computeMacroExperienceDuration)
      .toPromise();
    expect(languageMap).toEqual({
      GO: 579,
      Java: 274,
      Javascript: 184,
      Python: 335,
    });
  });
});
