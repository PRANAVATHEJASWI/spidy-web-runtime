import React from 'react';

export default function ResumeCard({ 
  primaryTitle, 
  secondaryTitle, 
  metaRight, 
  dateRange, 
  highlights = [], 
  techStack,
  link 
}) {
  return (
    <div 
      style={{ 
        borderLeft: '2px solid #000', 
        paddingLeft: '1.25rem', 
        marginBottom: '2rem',
        position: 'relative'
      }}
      className="resume-card-container"
    >
      {/* Visual Dot on border */}
      <div 
        style={{
          width: '8px',
          height: '8px',
          backgroundColor: '#000',
          position: 'absolute',
          left: '-5px',
          top: '6px'
        }}
      />
      
      <div className="resume-row" style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '1.05rem', alignItems: 'center' }}>
        <span>
          {primaryTitle}
          {link && (
            <a href={link} target="_blank" rel="noreferrer" style={{ marginLeft: '0.5rem', color: '#000', opacity: 0.6 }} title="View External Link">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          )}
        </span>
        {metaRight && <span className="mono" style={{ fontSize: '0.95rem' }}>{metaRight}</span>}
      </div>

      <div className="resume-subrow" style={{ display: 'flex', justifyContent: 'space-between', fontStyle: 'italic', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
        <span>{secondaryTitle}</span>
        <span>{dateRange}</span>
      </div>

      {techStack && (
        <div className="mono" style={{ fontSize: '0.8rem', fontWeight: 'bold', margin: '0.5rem 0', textTransform: 'uppercase' }}>
          Tech: {techStack}
        </div>
      )}

      {highlights.length > 0 && (
        <ul className="resume-bullets" style={{ listStyleType: 'square', paddingLeft: '1.1rem', fontSize: '0.95rem' }}>
          {highlights.map((bullet, idx) => (
            <li key={idx} style={{ marginBottom: '0.25rem' }}>{bullet}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
