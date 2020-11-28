import { createContext, Dispatch, useReducer } from "react";
import { ResumeFilter } from "../service/resume";
import { ExperienceFilter } from "../service/experience";

const filtersDefault: ExperienceFilter = {
  tags: [],
  facets: [],
};

export const FilterContext = createContext({
  filters: filtersDefault,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dispatch: (_: Partial<ResumeFilter>) => {},
});

export default function useFilters(): [
  ResumeFilter,
  Dispatch<Partial<ResumeFilter>>
] {
  return useReducer(
    (state: ResumeFilter, patch: Partial<ResumeFilter>) => ({
      ...state,
      ...patch,
    }),
    {
      tags: [],
      facets: [],
    }
  );
}
