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
  themes: { name: string; note: string }[];
};

export type Project = {
  name: string;
  status: string;
  summary: string;
  links: Link[];
};

export type Writing = {
  profileUrl: string;
  books: { title: string; date: string; url: string }[];
  articles: { title: string; date: string; url: string }[];
};

export type About = {
  body: string[];
  links: Link[];
};
