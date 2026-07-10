import React from 'react';

export default function SkillsGrid({ skills }) {
  const { languages = [], automationTesting = [], aiLlm = [], toolsTechnologies = [] } = skills;

  const categories = [
    { title: 'Languages', items: languages },
    { title: 'Automation & Testing', items: automationTesting },
    { title: 'AI & LLM', items: aiLlm },
    { title: 'Tools & Tech', items: toolsTechnologies }
  ];

  return (
    <div className="skills-grid">
      {categories.map((cat, idx) => (
        <div className="skills-category" key={idx}>
          <h4 className="mono">{cat.title}</h4>
          <div className="skills-list">
            {cat.items.map((item, itemIdx) => (
              <span key={itemIdx} className="skill-tag">{item}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
