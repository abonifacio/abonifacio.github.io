import { forkJoin, from, Observable } from "rxjs";
import { filter, map, mergeMap, toArray } from "rxjs/operators";
import MacroExperience from "../model/macroExperience";
import RealMilestone from "../model/milestone";
import Experience from "../model/experience";
import { collectFacets, collectTags, facetFilter, tagFilter } from "./tags";

export type Milestone = Omit<RealMilestone, "title">;

export type EnhancedExperience = {
  collectedTags: string[];
  collectedFacets?: string[];
};

export function experienceEnhancer<
  T extends Pick<
    MacroExperience,
    "milestones" | "tags" | "period" | "organization"
  >
>(): (experiences$: Observable<T>) => Observable<T & EnhancedExperience> {
  return (experiences$: Observable<T>) =>
    experiences$.pipe(
      mergeMap((exp) => {
        const milestones$ = from(exp.milestones || []);
        const tags$ = milestones$.pipe(collectTags, toArray());
        const facets$ = milestones$.pipe(collectFacets, toArray());
        return forkJoin([tags$, facets$]).pipe(
          map(([collectedTags, collectedFacets]) => ({
            ...exp,
            collectedTags: (exp.tags || []).concat(collectedTags),
            collectedFacets,
          }))
        );
      })
    );
}

export interface ExperienceFilter {
  tags: string[];
  facets: string[];
}

export function experienceFilter<T extends Experience>({
  tags,
  facets,
}: ExperienceFilter): (experience$: Observable<T>) => Observable<T> {
  return (experience$) => {
    return experience$.pipe(
      filter(tagFilter(tags)),
      filter(facetFilter(facets))
    );
  };
}
