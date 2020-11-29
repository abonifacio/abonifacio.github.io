import { forkJoin, from, Observable, OperatorFunction } from "rxjs";
import { map, mergeMap, toArray } from "rxjs/operators";
import { Resume } from "../model/resume";
import MacroExperience from "../model/macroExperience";
import {
  EnhancedExperience,
  experienceEnhancer,
  ExperienceFilter,
  experienceFilter,
} from "./experience";
import Job from "../model/job";
import Profile from "../model/profile";

function fetchResume(): Promise<Resume> {
  return fetch("/resume.json").then((res) => res.json());
}

export function enhanceResume(resume: Resume): Observable<EnhancedResume> {
  // const sideProjects$ = from(resume.sideProjects);
  const jobs$ = from(resume.jobs);
  const education$ = from(resume.education);

  const enhanceExperiences = experienceEnhancer<MacroExperience>();

  const enhancedJobs$ = jobs$.pipe(enhanceExperiences);
  const enhancedEducation$ = education$.pipe(enhanceExperiences);

  return forkJoin([
    enhancedJobs$.pipe(toArray()),
    enhancedEducation$.pipe(toArray()),
    // concat(enhancedJobs$, enhancedEducation$).pipe(collectTags, toArray()),
  ]).pipe(
    map(([jobs, education]) => ({
      ...resume,
      jobs,
      education,
    }))
  );
}

export type ResumeFilter = ExperienceFilter;

export function filterResume<T extends Resume>(
  opts: ResumeFilter
): (resume$: Observable<T>) => Observable<T> {
  return (resume$: Observable<T>) => {
    const filterExperiences = experienceFilter(opts);
    return resume$.pipe(
      mergeMap((resume) => {
        const jobs$ = from(resume.jobs).pipe(filterExperiences, toArray());
        const education$ = from(resume.education).pipe(
          filterExperiences,
          toArray()
        );
        const sideProjects$ = from(resume.sideProjects).pipe(
          filterExperiences,
          toArray()
        );
        return forkJoin([jobs$, education$, sideProjects$]).pipe(
          map(([jobs, education, sideProjects]) => ({
            ...resume,
            jobs,
            education,
            sideProjects,
          }))
        );
      })
    );
  };
}

export type EnhancedResume = Resume & {
  jobs: (Job & EnhancedExperience)[];
  education: (Job & EnhancedExperience)[];
};

export default function getResume(): Observable<EnhancedResume> {
  return from(fetchResume()).pipe(mergeMap(enhanceResume));
}

export function fillResume<T extends Resume>(
  inputData: Pick<Profile, "email" | "phone">
): OperatorFunction<T, T> {
  return (resume$: Observable<T>) =>
    resume$.pipe(
      map((resume) => {
        const { me, ...rest } = resume;
        return {
          ...rest,
          me: {
            ...me,
            ...inputData,
          },
        } as T;
      })
    );
}
