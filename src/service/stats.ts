import { concat, from as obsFrom, Observable, OperatorFunction } from "rxjs";
import { map, mergeMap, reduce } from "rxjs/operators";
import { parsePeriod, Precision } from "./period";
import { Milestone } from "./experience";
import Job from "../model/job";
import Education from "../model/education";

const MILLIS_TO_DAYS_DIVIDER = 1000 * 60 * 60 * 24;

function computeDurationInDays(
  string: string,
  parentUntil?: [Date, Precision]
) {
  const [[fromDate, fromPrecision], to] = parsePeriod(string);
  const [toDate] = to || parentUntil || [];
  if (!toDate) {
    if (fromPrecision === Precision.YEAR) {
      return 365;
    }
    return 30;
  }
  return Math.round(
    (toDate.getTime() - fromDate.getTime()) / MILLIS_TO_DAYS_DIVIDER
  );
}

type WithDuration = {
  durationInDays: number;
};

export function computeMilestoneDuration<T extends { date: string }>(
  parentUntil?: [Date, Precision]
): OperatorFunction<T, T & WithDuration> {
  return (milestone$: Observable<T>) => {
    return milestone$.pipe(
      map((milestone) => ({
        ...milestone,
        durationInDays: computeDurationInDays(milestone.date, parentUntil),
      }))
    );
  };
}

export function computeLanguageStats<
  T extends Pick<Milestone, "tags"> & WithDuration
>(
  reducer: (a: number, b: number) => number
): OperatorFunction<T, Record<string, number>> {
  return (experience$: Observable<T>) =>
    experience$.pipe(
      reduce(
        (languageMap, { tags, durationInDays }) =>
          (tags || []).reduce(
            (subLanguageMap, tag) => ({
              ...subLanguageMap,
              [tag]: reducer(subLanguageMap[tag] || 0, durationInDays),
            }),
            languageMap
          ),
        {} as Record<string, number>
      )
    );
}

export function sumTagMaps(
  obs$: Observable<Record<string, number>>
): Observable<Record<string, number>> {
  return obs$.pipe(
    reduce((tagMap, subTagMap) =>
      Object.entries(subTagMap).reduce(
        (acc, [tag, duration]) => ({
          ...acc,
          [tag]: (acc[tag] || 0) + duration,
        }),
        tagMap
      )
    )
  );
}

export function computeMacroExperienceDuration<
  T extends { period: string; milestones?: Pick<Milestone, "date" | "tags">[] }
>(experience$: Observable<T>): Observable<Record<string, number>> {
  return experience$.pipe(
    mergeMap(({ milestones, period }) =>
      obsFrom(milestones || []).pipe(
        computeMilestoneDuration(parsePeriod(period)[1]),
        computeLanguageStats(Math.max)
      )
    ),
    sumTagMaps
  );
}

export type Stats = {
  experience: Record<string, number>;
};

export function computeResumeStats(
  jobs$: Observable<Job>,
  education$: Observable<Education>,
  projects$: Observable<Milestone>
): Observable<Stats> {
  const projectsExp$ = obsFrom(projects$).pipe(
    computeMilestoneDuration(),
    computeLanguageStats((a, b) => a + b)
  );
  const jobsExp$ = obsFrom(jobs$).pipe(computeMacroExperienceDuration);
  const educationExp$ = obsFrom(education$).pipe(
    computeMacroExperienceDuration
  );
  const experienceByTag = concat(projectsExp$, jobsExp$, educationExp$).pipe(
    sumTagMaps
  );
  return experienceByTag.pipe(
    map((experience) => ({
      experience,
    }))
  );
}
