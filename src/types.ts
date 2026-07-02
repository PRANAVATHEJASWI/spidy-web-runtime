export type SectionType =
  | "hero"
  | "cards"
  | "skills"
  | "timeline"
  | "projects"
  | "certificates"
  | "publication"
  | "contact"
  | "custom";

export type Theme = {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  radius: number;
  font: string;
};

export type NavItem = {
  label: string;
  section_id: string;
  visible: boolean;
};

export type Section = {
  id: string;
  type: SectionType;
  title: string;
  subtitle?: string;
  visible: boolean;
  layout: string;
  items: Record<string, unknown>[];
  settings: Record<string, unknown>;
};

export type PortfolioDocument = {
  title: string;
  owner_name: string;
  role: string;
  summary: string;
  avatar_url?: string;
  layout: string;
  contact: Record<string, string>;
  theme: Theme;
  navbar: NavItem[];
  sections: Section[];
};

export type Runtime = {
  id: string;
  user_id: string;
  template_id: string;
  slug: string;
  document: PortfolioDocument;
  created_at: string;
  updated_at: string;
  published: boolean;
};
