import { EMPTY, of } from "rxjs";
import useObservable from "./useObservable";
import getResume, {
  EnhancedResume,
  filterResume,
  ResumeFilter,
} from "../service/resume";

export default function useResume(
  filterOptions: ResumeFilter
): {
  loading: boolean;
  resume: EnhancedResume | undefined;
  error: Error | undefined;
} {
  const resume = useObservable(getResume);
  const filteredResume = useObservable(
    () =>
      (resume.data ? of(resume.data) : EMPTY).pipe(filterResume(filterOptions)),
    [resume.data, filterOptions]
  );
  return {
    loading: true,
    resume: filteredResume.data,
    error: resume.error || filteredResume.error,
  };
}
