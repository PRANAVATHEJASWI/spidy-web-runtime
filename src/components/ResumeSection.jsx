import React from 'react';

export default function ResumeSection({ title, children }) {
  return (
    <section className="resume-section">
      <h2 className="section-title mono">{title}</h2>
      <div className="section-content">
        {children}
      </div>
    </section>
  );
}
