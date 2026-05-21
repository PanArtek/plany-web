export interface ProcessStep {
  id: string;
  num: string;
  label: string;
  duration: string;
  title: string;
  titleEm: string;
  deliverable: string;
  body: string;
  proof: string[];
  caseLabel?: string;
  caseLink: string;
  image?: string;
  embed?: string;
}
