import React, { useState, useEffect } from 'react';
import { FileText, BookOpen } from 'lucide-react';
import BrowserFrame from './components/BrowserFrame';
import BlogSection from './components/BlogSection';
import ResumeSection from './components/ResumeSection';
import ResumeCard from './components/ResumeCard';
import SkillsGrid from './components/SkillsGrid';

export default function App() {
  const apiBase = (import.meta.env.VITE_API_URL || 'https://spidy-web-backend.onrender.com').replace(/\/$/, '');
  const apiUrl = (path) => `${apiBase}${path}`;
  const [activeTab, setActiveTab] = useState('portfolio'); // 'portfolio' or 'blog'
  const [resumeData, setResumeData] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch initial data
  useEffect(() => {
    async function initFetch() {
      try {
        setLoading(true);

        // Fetch resume
        const resumeRes = await fetch(apiUrl('/api/resume'));
        if (!resumeRes.ok) throw new Error('Failed to load resume details.');
        const resumeJson = await resumeRes.json();
        setResumeData(resumeJson);

        // Fetch blogs
        const blogsRes = await fetch(apiUrl('/api/blogs'));
        if (!blogsRes.ok) throw new Error('Failed to load blog posts.');
        const blogsJson = await blogsRes.json();
        setBlogs(blogsJson);

        setError(null);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to fetch data from the server.');
      } finally {
        setLoading(false);
      }
    }

    initFetch();
  }, []);

  return (
    <div>
      {/* Navigation Header */}
      <nav className="site-nav">
        <a href="/" className="site-logo mono" onClick={(e) => { e.preventDefault(); setActiveTab('portfolio'); }}>
          PRANAVA THEJASWI
        </a>
        <div className="nav-links">
          <button 
            className={`nav-btn ${activeTab === 'portfolio' ? 'active' : ''}`} 
            onClick={() => setActiveTab('portfolio')}
          >
            <FileText size={14} style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} /> Portfolio
          </button>
          <button 
            className={`nav-btn ${activeTab === 'blog' ? 'active' : ''}`} 
            onClick={() => setActiveTab('blog')}
          >
            <BookOpen size={14} style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} /> Blogs
          </button>
        </div>
      </nav>

      {/* Error Banner */}
      {error && (
        <div style={{ backgroundColor: '#000', color: '#fff', borderBottom: '1px solid #000', padding: '1rem', textAlign: 'center' }} className="mono">
          <p style={{ fontWeight: '700' }}>[ WARNING ]</p>
          <p style={{ fontSize: '0.9rem' }}>{error}</p>
        </div>
      )}

      {/* Loading Screen */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <div className="mono" style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
            Initializing Website...
          </div>
        </div>
      ) : (
        <div className="container">
          {/* Portfolio Tab */}
          {activeTab === 'portfolio' && resumeData && (
            <div>
              {/* Browser Hero Component */}
              <BrowserFrame 
                resumeData={resumeData} 
                isEditing={false}
                onNavigate={setActiveTab}
                isEditorPage={false}
              />

              {/* Resume Sheet */}
              <div className="resume-container">
                <header className="resume-header">
                  <div>
                    <h1 className="resume-name">{resumeData.name}</h1>
                    <p className="resume-title mono">{resumeData.subTitle}</p>
                  </div>
                  <div className="resume-contact mono">
                    <span>{resumeData.contact.phone}</span> | 
                    <a href={`mailto:${resumeData.contact.email}`}>{resumeData.contact.email}</a> | 
                    <a href={resumeData.contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a> | 
                    <a href={resumeData.contact.github} target="_blank" rel="noreferrer">GitHub</a>
                    {resumeData.contact.extraUrls && resumeData.contact.extraUrls.map((ext, idx) => (
                      <span key={idx}> | <a href={ext.url} target="_blank" rel="noreferrer">{ext.label}</a></span>
                    ))}
                  </div>
                </header>

                {/* EDUCATION */}
                <ResumeSection title="Education">
                  {resumeData.education.length > 0 ? (
                    resumeData.education.map((edu, idx) => (
                      <ResumeCard
                        key={idx}
                        primaryTitle={edu.institution}
                        secondaryTitle={edu.degree}
                        metaRight={`CGPA: ${edu.cgpa}`}
                        dateRange={edu.duration}
                        link={edu.link}
                      />
                    ))
                  ) : (
                    <p className="mono">No education details configured.</p>
                  )}
                </ResumeSection>

                {/* EXPERIENCE */}
                <ResumeSection title="Experience">
                  {resumeData.experience.length > 0 ? (
                    resumeData.experience.map((exp, idx) => (
                      <ResumeCard
                        key={idx}
                        primaryTitle={exp.role}
                        secondaryTitle={exp.company}
                        metaRight={exp.location}
                        dateRange={exp.duration}
                        highlights={exp.highlights}
                        link={exp.link}
                      />
                    ))
                  ) : (
                    <p className="mono">No experience details configured.</p>
                  )}
                </ResumeSection>

                {/* PROJECTS */}
                <ResumeSection title="Projects">
                  {resumeData.projects.length > 0 ? (
                    resumeData.projects.map((proj, idx) => (
                      <ResumeCard
                        key={idx}
                        primaryTitle={proj.title}
                        secondaryTitle=""
                        dateRange=""
                        techStack={proj.techStack}
                        highlights={proj.highlights}
                        link={proj.link}
                      />
                    ))
                  ) : (
                    <p className="mono">No projects configured.</p>
                  )}
                </ResumeSection>

                {/* SKILLS */}
                <ResumeSection title="Technical Skills">
                  <SkillsGrid skills={resumeData.skills} />
                </ResumeSection>

                {/* CERTIFICATES */}
                <ResumeSection title="Certificates">
                  <ul className="resume-bullets" style={{ listStyleType: 'square', paddingLeft: '1.1rem', fontSize: '1rem', lineHeight: '1.6' }}>
                    {resumeData.certificates.map((cert, idx) => (
                      <li key={idx} style={{ marginBottom: '0.5rem' }}>{cert}</li>
                    ))}
                  </ul>
                </ResumeSection>

                {/* PUBLICATIONS */}
                <ResumeSection title="Publications">
                  {resumeData.publications.length > 0 ? (
                    resumeData.publications.map((pub, idx) => (
                      <ResumeCard
                        key={idx}
                        primaryTitle={pub.title}
                        secondaryTitle={pub.journal}
                        metaRight={pub.volumeInfo}
                        dateRange=""
                        link={pub.url}
                      />
                    ))
                  ) : (
                    <p className="mono">No publications listed.</p>
                  )}
                </ResumeSection>

                {/* CUSTOM SECTIONS LIVE */}
                {resumeData.customSections && resumeData.customSections.length > 0 && resumeData.customSections.map((sec, idx) => (
                  <ResumeSection key={`custom-${idx}`} title={sec.title}>
                    {(!sec.type || sec.type === 'list') && (
                      <ul className="resume-bullets" style={{ listStyleType: 'square', paddingLeft: '1.1rem', fontSize: '1rem', lineHeight: '1.6' }}>
                        {sec.items.map((item, itemIdx) => (
                          <li key={itemIdx} style={{ marginBottom: '0.75rem' }}>
                            {item.text}
                            {item.link && (
                              <a href={item.link} target="_blank" rel="noreferrer" style={{ marginLeft: '0.5rem', color: '#000', fontWeight: 'bold' }}>
                                &rarr; Link
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {sec.type === 'grid' && (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                        {sec.items.map((item, itemIdx) => (
                          <div key={itemIdx} style={{ padding: '1rem', border: '1.5px solid #000' }}>
                            <p style={{ margin: 0, fontSize: '0.95rem' }}>{item.text}</p>
                            {item.link && (
                              <a href={item.link} target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: '0.5rem', color: '#000', fontWeight: 'bold', fontSize: '0.85rem' }}>
                                View Details &rarr;
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {sec.type === 'badges' && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {sec.items.map((item, itemIdx) => (
                          item.link ? (
                            <a key={itemIdx} href={item.link} target="_blank" rel="noreferrer" className="mono" style={{ padding: '0.25rem 0.75rem', border: '1px solid #000', color: '#000', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>
                              {item.text} &nearr;
                            </a>
                          ) : (
                            <span key={itemIdx} className="mono" style={{ padding: '0.25rem 0.75rem', border: '1px solid #000', fontSize: '0.85rem', backgroundColor: '#f9f9f9' }}>
                              {item.text}
                            </span>
                          )
                        ))}
                      </div>
                    )}
                  </ResumeSection>
                ))}
              </div>
            </div>
          )}

          {/* Blogs Tab */}
          {activeTab === 'blog' && (
            <BlogSection 
              blogs={blogs} 
              isEditing={false} 
            />
          )}
        </div>
      )}

      {/* tag-liner requested by user */}
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', margin: '4rem 0 2rem' }}>
          <div style={{ flexGrow: 1, height: '1.5px', backgroundColor: '#000' }} />
          <span style={{ padding: '0 1.5rem', fontSize: '0.75rem', letterSpacing: '0.25em', fontWeight: 'bold', textAlign: 'center' }} className="mono">
            STRICT MONOCHROME EDITORIAL WORKPLACE
          </span>
          <div style={{ flexGrow: 1, height: '1.5px', backgroundColor: '#000' }} />
        </div>
      </div>

      {/* Footer Branding */}
      <footer style={{ padding: '1rem 0 3rem', textAlign: 'center' }} className="mono">
        <p style={{ fontSize: '0.8rem', letterSpacing: '0.15em' }}>
          &copy; {new Date().getFullYear()} PRANAVA THEJASWI N M. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </div>
  );
}
