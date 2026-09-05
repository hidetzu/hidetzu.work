export type Link = { label: string; url: string };

export type Site = {
  name: string;
  tagline: string;
  description: string;
  lang: string;
  locale: string;
  links: Link[];
};

export type Now = {
  updated: string;
  lead: string;
  questions: { name: string; question: string; note: string }[];
};

export type Project = {
  name: string;
  status: string;
  motif: 'map' | 'loop' | 'packet';
  summary: string;
  experiment: string;
  links: Link[];
};

export type Writing = {
  profileUrl: string;
  articles: { topic: string; title: string; date: string; url: string }[];
};

export type About = {
  body: string[];
  links: Link[];
};
