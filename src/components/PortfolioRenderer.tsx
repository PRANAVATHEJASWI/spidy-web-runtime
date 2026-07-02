import type { PortfolioDocument, Section } from "../types";
import React from "react";

type Props = {
  document: PortfolioDocument;
  compact?: boolean;
};

function renderItemValue(value: unknown) {
  if (Array.isArray(value)) {
    return (
      <ul className="clean-list">
        {value.map((entry, index) => (
          <li key={index}>{String(entry)}</li>
        ))}
      </ul>
    );
  }
  return <span className="item-text">{String(value)}</span>;
}

function renderContactLinks(contact: Record<string, string>, layout: string) {
  return (
    <div className={`contact-links-container layout-${layout}-links`}>
      {Object.entries(contact).map(([key, value]) => {
        const isLink = value.startsWith("http");
        if (isLink) {
          return (
            <a key={key} href={value} target="_blank" rel="noreferrer" className="contact-link-btn">
              {key} <span className="arrow">↗</span>
            </a>
          );
        }
        return (
          <div className="contact-item" key={key}>
            <strong className="contact-key">{key}</strong>
            <span className="contact-val">{value}</span>
          </div>
        );
      })}
    </div>
  );
}

function SectionItems({ section, layout }: { section: Section; layout: string }) {
  if (section.type === "skills") {
    return (
      <div className="skills-showcase">
        {section.items.map((item, index) => (
          <div className="skill-group-block" key={index}>
            <h4 className="skill-group-title">
              {String(item.group ?? item.title ?? "Skill Group")}
            </h4>
            <div className="skill-items-grid">
              {((item.skills as string[]) ?? []).map((skill) => (
                <div className="skill-pill" key={skill}>
                  <div className="skill-dot"></div>
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (section.type === "timeline") {
    return (
      <div className="timeline">
        {section.items.map((item, index) => (
          <article className="timeline-item" key={index}>
            <div className="timeline-header">
              <span className="timeline-period">{String(item.period ?? "")}</span>
              <h4>{String(item.title ?? "Role")}</h4>
            </div>
            <p className="timeline-org">
              {[item.org, item.location].filter(Boolean).join(" | ")}
            </p>
            {item.details && renderItemValue(item.details)}
          </article>
        ))}
      </div>
    );
  }

  if (section.type === "projects") {
    return (
      <div className={layout === "minimal" ? "card-stack" : "card-grid"}>
        {section.items.map((item, index) => (
          <article className="portfolio-card project-card" key={index}>
            <div className="project-card-header">
              <h4>{String(item.title ?? item.headline ?? "Untitled")}</h4>
              {item.metrics && <span className="project-metric">{String(item.metrics)}</span>}
            </div>
            <p className="project-desc">{String(item.description ?? "")}</p>
            {item.tech && Array.isArray(item.tech) && (
              <div className="chip-row project-tech">
                {(item.tech as string[]).map((t) => (
                  <span className="tech-badge" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            )}
            {Object.entries(item)
              .filter(([key]) => !["title", "headline", "description", "metrics", "tech"].includes(key))
              .map(([key, value]) => (
                <div className="item-line" key={key}>
                  <span className="item-label">{key}</span>
                  {renderItemValue(value)}
                </div>
              ))}
          </article>
        ))}
      </div>
    );
  }

  return (
    <div className="card-stack">
      {section.items.map((item, index) => (
        <article className="portfolio-card data-card" key={index}>
          <div className="card-item-header">
            <h4>{String(item.title ?? item.name ?? "Untitled")}</h4>
            {item.date && <span className="item-date">{String(item.date)}</span>}
            {item.year && <span className="item-date">{String(item.year)}</span>}
          </div>
          {item.issuer && <p className="card-sub text-muted">{String(item.issuer)}</p>}
          {item.venue && <p className="card-sub text-muted">{String(item.venue)}</p>}
          {item.description && <p className="card-body-text">{String(item.description)}</p>}

          {Object.entries(item)
            .filter(([key]) => !["title", "name", "description", "details", "date", "year", "issuer", "venue"].includes(key))
            .map(([key, value]) => (
              <div className="item-line" key={key}>
                <span className="item-label">{key}</span>
                {renderItemValue(value)}
              </div>
            ))}
        </article>
      ))}
    </div>
  );
}

export function PortfolioRenderer({ document, compact = false }: Props) {
  const theme = document.theme;
  const layout = document.layout ?? "vibrant";

  const customStyle = {
    "--primary": theme.primary,
    "--secondary": theme.secondary,
    "--accent": theme.accent,
    "--bg": theme.background,
    "--surface": theme.surface,
    "--text": theme.text,
    "--radius": `${theme.radius}px`,
    "--font": theme.font || "Inter",
  } as React.CSSProperties;

  // 1. PROFESSIONAL LAYOUT
  if (layout === "professional") {
    return (
      <main className={`portfolio-shell layout-professional ${compact ? "compact" : ""}`} style={customStyle}>
        <nav className="portfolio-nav">
          <strong className="brand-name">{document.owner_name}</strong>
          <div className="nav-links">
            {document.navbar.filter((item) => item.visible).map((item) => (
              <a key={item.section_id} href={`#${item.section_id}`}>
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        <div className="professional-layout-grid">
          <aside className="professional-sidebar-panel">
            <div className="profile-badge">
              <div className="avatar-placeholder">
                <span>{document.owner_name.charAt(0)}</span>
              </div>
              <h1 className="sidebar-name">{document.owner_name}</h1>
              <p className="sidebar-role">{document.role}</p>
            </div>
            
            <hr className="sidebar-divider" />
            
            <div className="sidebar-contact-block">
              <h3>Connect</h3>
              {renderContactLinks(document.contact, layout)}
            </div>
          </aside>

          <div className="professional-main-panel">
            <section className="professional-summary-section" id="hero">
              <h2>Executive Summary</h2>
              <p className="summary-text">{document.summary}</p>
            </section>

            {document.sections
              .filter((section) => section.visible && section.type !== "hero")
              .map((section) => (
                <section className="portfolio-section" id={section.id} key={section.id}>
                  <div className="section-heading">
                    <h2 className="section-title">{section.title}</h2>
                    {section.subtitle && <p className="section-subtitle">{section.subtitle}</p>}
                  </div>
                  <SectionItems section={section} layout={layout} />
                </section>
              ))}
          </div>
        </div>
      </main>
    );
  }

  // 2. MIDNIGHT LAYOUT
  if (layout === "midnight") {
    return (
      <main className={`portfolio-shell layout-midnight ${compact ? "compact" : ""}`} style={customStyle}>
        <div className="cyber-glow-orb-1"></div>
        <div className="cyber-glow-orb-2"></div>
        
        <nav className="portfolio-nav">
          <strong className="brand-name">{document.owner_name}</strong>
          <div className="nav-links">
            {document.navbar.filter((item) => item.visible).map((item) => (
              <a key={item.section_id} href={`#${item.section_id}`}>
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        <header className="portfolio-hero midnight-hero" id="hero">
          <div className="hero-left-col">
            <span className="hero-role-badge">&lt; {document.role} /&gt;</span>
            <h1 className="hero-main-title">{document.owner_name}</h1>
            <p className="hero-summary">{document.summary}</p>
          </div>
          <aside className="hero-right-card">
            <h3>Terminal info</h3>
            <div className="terminal-lines">
              {Object.entries(document.contact).map(([key, value]) => {
                const isLink = value.startsWith("http");
                return (
                  <p key={key}>
                    <span className="term-prompt">$ locate {key}:</span>{" "}
                    {isLink ? (
                      <a href={value} target="_blank" rel="noreferrer" className="term-value term-link">
                        {value}
                      </a>
                    ) : (
                      <span className="term-value">{value}</span>
                    )}
                  </p>
                );
              })}
            </div>
          </aside>
        </header>

        {document.sections
          .filter((section) => section.visible && section.type !== "hero")
          .map((section) => (
            <section className="portfolio-section" id={section.id} key={section.id}>
              <div className="section-heading">
                <span className="section-type-badge">// {section.type}</span>
                <h2 className="section-title">{section.title}</h2>
                {section.subtitle && <p className="section-subtitle">{section.subtitle}</p>}
              </div>
              <SectionItems section={section} layout={layout} />
            </section>
          ))}
      </main>
    );
  }

  // 3. MINIMAL LAYOUT
  if (layout === "minimal") {
    return (
      <main className={`portfolio-shell layout-minimal ${compact ? "compact" : ""}`} style={customStyle}>
        <div className="minimal-container">
          <header className="minimal-header" id="hero">
            <div className="minimal-hero-top">
              <h1 className="minimal-name">{document.owner_name}</h1>
              <p className="minimal-role">{document.role}</p>
            </div>
            <p className="minimal-summary">{document.summary}</p>
            {renderContactLinks(document.contact, layout)}
          </header>

          <hr className="minimal-divider" />

          {document.sections
            .filter((section) => section.visible && section.type !== "hero")
            .map((section) => (
              <section className="portfolio-section minimal-section" id={section.id} key={section.id}>
                <div className="section-heading">
                  <h2 className="section-title">{section.title}</h2>
                  {section.subtitle && <p className="section-subtitle">{section.subtitle}</p>}
                </div>
                <SectionItems section={section} layout={layout} />
                <hr className="minimal-divider-sm" />
              </section>
            ))}
        </div>
      </main>
    );
  }

  // 4. VIBRANT LAYOUT
  return (
    <main className={`portfolio-shell layout-vibrant ${compact ? "compact" : ""}`} style={customStyle}>
      <nav className="portfolio-nav">
        <strong className="brand-name">{document.owner_name}</strong>
        <div className="nav-links">
          {document.navbar.filter((item) => item.visible).map((item) => (
            <a key={item.section_id} href={`#${item.section_id}`}>
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <header className="portfolio-hero vibrant-hero" id="hero">
        <div className="vibrant-hero-content">
          <div className="vibrant-badge">{document.role}</div>
          <h1 className="vibrant-title">{document.owner_name}</h1>
          <p className="vibrant-summary">{document.summary}</p>
          <div className="vibrant-hero-links">
            {renderContactLinks(document.contact, layout)}
          </div>
        </div>
        <div className="vibrant-hero-decoration">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
        </div>
      </header>

      {document.sections
        .filter((section) => section.visible && section.type !== "hero")
        .map((section) => (
          <section className="portfolio-section" id={section.id} key={section.id}>
            <div className="section-heading">
              <h2>{section.title}</h2>
              {section.subtitle && <p className="section-subtitle">{section.subtitle}</p>}
            </div>
            <SectionItems section={section} layout={layout} />
          </section>
        ))}
    </main>
  );
}
