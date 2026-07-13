import React, { useState } from 'react';
import { Menu, X, FileText, BookOpen, ExternalLink, PenTool } from 'lucide-react';
import Hero from './Hero';

export default function BrowserFrame({ 
  resumeData, 
  isEditing, 
  onChange, 
  onNavigate,
  isEditorPage 
}) {
  const { name = '', title = '', description = '', askMrNoob = null } = resumeData;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const liveSiteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://pranavathejaswi.dev';
  const editorUrl = `${liveSiteUrl}/editor`;

  const handleNameChange = (val) => {
    onChange({ ...resumeData, name: val });
  };

  const handleTitleChange = (val) => {
    onChange({ ...resumeData, title: val });
  };

  const handleLinkClick = (tab) => {
    onNavigate(tab);
    setDropdownOpen(false);
  };

  return (
    <div className="browser-mockup" style={{ position: 'relative' }}>
      {/* Browser Header Bar */}
      <div className="browser-header">
        <div className="browser-dots">
          <span className="browser-dot"></span>
          <span className="browser-dot"></span>
          <span className="browser-dot"></span>
        </div>
        
        <div className="browser-address-bar mono">
          {isEditorPage ? editorUrl : liveSiteUrl}
        </div>
        
        {/* Hamburger Expand Button */}
        <div 
          className="browser-menu-icon" 
          onClick={() => setDropdownOpen(!dropdownOpen)} 
          title="Navigation"
          style={{ transition: 'transform 0.2s ease' }}
        >
          {dropdownOpen ? <X size={18} /> : <Menu size={18} />}
        </div>
      </div>

      {/* Dropdown Navigation Menu */}
      {dropdownOpen && (
        <div 
          style={{
            position: 'absolute',
            top: '43px',
            right: '0',
            width: '240px',
            backgroundColor: '#ffffff',
            borderLeft: '1.5px solid #000000',
            borderBottom: '1.5px solid #000000',
            zIndex: 999,
            animation: 'fadeIn 0.2s ease-out',
            boxShadow: '4px 4px 0px #000000'
          }}
          className="mono"
        >
          <ul style={{ listStyle: 'none', padding: '0.5rem 0' }}>
              <>
                <li style={{ borderBottom: '1px solid #eee' }}>
                  <button 
                    onClick={() => handleLinkClick('portfolio')} 
                    style={{
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      padding: '0.85rem 1.25rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: '#000'
                    }}
                  >
                    <FileText size={14} /> Resume & Details
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleLinkClick('blog')} 
                    style={{
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      padding: '0.85rem 1.25rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: '#000'
                    }}
                  >
                    <BookOpen size={14} /> Notebook / Blogs
                  </button>
                </li>
              </>
          </ul>
        </div>
      )}

      <div className="browser-content">
          <Hero 
            name={name} 
            title={title} 
            description={description}
            askMrNoob={askMrNoob}
            contact={resumeData.contact || {}}
            isEditing={false} 
          />
      </div>
    </div>
  );
}
