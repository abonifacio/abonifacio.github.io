import { IconType } from "react-icons";
import { FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/all";
import { Social } from "../model/profile";

export default function socialDefaultProps(
  name: string,
  social: Social | string
): (Omit<Social, "icon"> & { icon: string | IconType }) | null {
  if (typeof social !== "string") {
    return {
      color: "gray",
      ...social,
    };
  }
  switch (name) {
    case "github":
      return {
        color: "gray",
        label: social,
        icon: FaGithub,
        link: `https://github.com/${social}`,
      };
    case "linkedin":
      return {
        color: "linkedin",
        label: social,
        icon: FaLinkedinIn,
        link: `https://linkedin.com/in/${social}`,
      };
    case "twitter":
      return {
        color: "twitter",
        label: social,
        icon: FaTwitter,
        link: `https://twitter.com/${social}`,
      };
    default:
      return null;
  }
}
