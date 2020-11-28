export interface Social {
  label: string;
  link: string;
  icon: string;
  color?: string;
}

export interface Socials extends Record<string, Social | string | undefined> {
  linkedin?: string | Social;
  github?: string | Social;
  twitter?: string | Social;
}

export default interface Profile {
  name: string;
  location: string;
  email?: string;
  phone?: string;
  socials: Socials;
  picture: string;
  coverLetter: string;
}
