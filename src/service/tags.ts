import { Observable } from "rxjs";
import { concatAll, distinct, map } from "rxjs/operators";
import Experience from "../model/experience";

type WithTags = { tags?: string[] } | { collectedTags: string[] };

export function getTags(exp: WithTags): string[] {
  if ("collectedTags" in exp) {
    return exp.collectedTags;
  }
  return exp.tags || [];
}

export function collectTags<T extends WithTags>(
  exp$: Observable<T>
): Observable<string> {
  return exp$.pipe(map(getTags), concatAll(), distinct());
}

export function tagFilter<T extends WithTags>(
  tags?: string[]
): (exp: T) => boolean {
  return (exp) => !tags?.length || getTags(exp).some((l) => tags.includes(l));
}

type WithFacets = { facets?: string[] } | { collectedFacets: string[] };

export function getFacets(exp: WithFacets): string[] {
  if ("collectedFacets" in exp) {
    return exp.collectedFacets;
  }
  return exp.facets || [];
}

export function collectFacets<T extends { facets?: string[] }>(
  exp$: Observable<T>
): Observable<string> {
  return exp$.pipe(map(getFacets), concatAll(), distinct());
}

export function facetFilter<T extends Experience>(
  facets?: string[]
): (exp: T) => boolean {
  return (exp) =>
    !facets?.length || getFacets(exp).some((l) => facets.includes(l));
}
