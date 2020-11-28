import Milestone from "./milestone";
import Experience from "./experience";

export default interface MacroExperience extends Experience {
  period: string;
  organization: string;
  milestones?: Milestone[];
}
