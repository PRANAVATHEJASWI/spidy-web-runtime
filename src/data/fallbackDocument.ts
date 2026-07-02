import type { PortfolioDocument } from "../types";

export const fallbackDocument: PortfolioDocument = {
  title: "Alex Johnson Portfolio",
  owner_name: "Alex Johnson",
  role: "Software Engineer",
  summary: "Software engineer focused on scalable web platforms, developer tools, and intuitive user experiences.",
  layout: "vibrant",
  contact: {
    email: "alex@example.com",
    phone: "+1 (555) 123-4567",
    linkedin: "linkedin.com/in/alexjohnson",
    github: "github.com/alexjohnson",
  },
  theme: {
    name: "Vibrant",
    primary: "#ef4444",
    secondary: "#2563eb",
    accent: "#f59e0b",
    background: "#fff7ed",
    surface: "#ffffff",
    text: "#111827",
    radius: 8,
    font: "Inter",
  },
  navbar: [
    { label: "Experience", section_id: "experience", visible: true },
    { label: "Projects", section_id: "projects", visible: true },
    { label: "Skills", section_id: "skills", visible: true },
  ],
  sections: [
    {
      id: "experience",
      type: "timeline",
      title: "Experience",
      visible: true,
      layout: "default",
      settings: {},
      items: [
        {
          title: "Software Engineer",
          org: "TechNova Inc.",
          period: "Jan 2024 - Present",
          details: ["Architected a microservices platform", "Led migration to event-driven architecture"],
        },
      ],
    },
    {
      id: "projects",
      type: "projects",
      title: "Projects",
      visible: true,
      layout: "grid",
      settings: {},
      items: [
        {
          title: "CloudSync",
          description: "Real-time collaboration platform with offline sync.",
          metrics: "10K+ users",
          tech: ["React", "Node.js", "WebSocket"],
        },
      ],
    },
    {
      id: "skills",
      type: "skills",
      title: "Skills",
      visible: true,
      layout: "chips",
      settings: {},
      items: [{ group: "Core", skills: ["TypeScript", "Python", "React", "Node.js", "SQL", "Docker"] }],
    },
  ],
};
