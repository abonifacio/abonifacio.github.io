import MacroExperience from "../model/macroExperience";
import Milestone from "../model/milestone";

export default function milestoneToPlainText({
  title,
  tags,
}: Pick<Milestone, "title" | "tags">): string {
  let str = `- ${title}`;
  if (tags) {
    str +=
      tags?.map(
        (t) => `
  - ${t}`
      ) || "";
  }
  return str;
}

export function experienceToPlainText({
  description,
  milestones,
}: Pick<MacroExperience, "description" | "milestones">): string {
  return `
${description || ""}

Milestones:
${
  milestones?.map(({ title }) => milestoneToPlainText({ title })).join("\n") ||
  ""
}

Technologies:
${
  milestones
    ?.flatMap((it) => it.tags || [])
    .map((it) => `- ${it}`)
    .join("\n") || ""
}
  `;
}
