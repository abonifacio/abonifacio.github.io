import Milestone from "./milestone";
import Job from "./job";
import Education from "./education";
import Profile from "./profile";

export interface Resume {
  filters: {
    facets: string[];
    tags: string[];
  };
  me: Profile;
  jobs: Job[];
  education: Education[];
  sideProjects: Milestone[];
}
