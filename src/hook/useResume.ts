import { EMPTY, of } from "rxjs";
import useObservable from "./useObservable";
import getResume, {
  EnhancedResume,
  fillResume,
  filterResume,
  ResumeFilter,
} from "../service/resume";
import Profile from "../model/profile";

export default function useResume(
  filterOptions: ResumeFilter,
  inputData: Pick<Profile, "email" | "phone">
): {
  loading: boolean;
  resume: EnhancedResume | undefined;
  error: Error | undefined;
} {
  const resume = useObservable(getResume);
  const filteredResume = useObservable(
    () =>
      (resume.data ? of(resume.data) : EMPTY).pipe(
        fillResume(inputData),
        filterResume(filterOptions)
      ),
    [resume.data, filterOptions, inputData]
  );
  return {
    loading: true,
    resume: filteredResume.data,
    error: resume.error || filteredResume.error,
  };
}
