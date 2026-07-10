import React from 'react';
import ProfilePic from './ProfilePic';
import { MessageSquare, ExternalLink, Github, Linkedin, Twitter, Youtube, Instagram, Facebook, Link as LinkIcon } from 'lucide-react';

export default function Hero({ name, title, description, askMrNoob, contact, isEditing, onNameChange, onTitleChange }) {
  const getIconForUrl = (url, label) => {
    if (!url) return <LinkIcon size={18} />;
    const lUrl = url.toLowerCase();
    const lLabel = label ? label.toLowerCase() : '';
    if (lUrl.includes('github') || lLabel.includes('github')) return <Github size={18} />;
    if (lUrl.includes('linkedin') || lLabel.includes('linkedin')) return <Linkedin size={18} />;
    if (lUrl.includes('twitter') || lLabel.includes('twitter') || lUrl.includes('x.com')) return <Twitter size={18} />;
    if (lUrl.includes('youtube') || lLabel.includes('youtube')) return <Youtube size={18} />;
    if (lUrl.includes('instagram') || lLabel.includes('instagram')) return <Instagram size={18} />;
    if (lUrl.includes('facebook') || lLabel.includes('facebook')) return <Facebook size={18} />;
    
    if (label) {
      return (
        <span style={{ fontSize: '14px', fontWeight: 'bold', width: '18px', textAlign: 'center', display: 'inline-block' }}>
          {label.charAt(0).toUpperCase()}
        </span>
      );
    }
    return <LinkIcon size={18} />;
  };

  const mediaLinks = [];
  if (contact?.github) mediaLinks.push({ url: contact.github, label: 'GitHub' });
  if (contact?.linkedin) mediaLinks.push({ url: contact.linkedin, label: 'LinkedIn' });
  if (contact?.extraUrls) {
    contact.extraUrls.forEach(eu => mediaLinks.push({ url: eu.url, label: eu.label }));
  }
  return (
    <div 
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '3rem',
        width: '100%',
        padding: '1rem 0'
      }}
    >
      {isEditing ? (
        <div style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group" style={{ textAlign: 'left' }}>
            <label>Name</label>
            <input
              type="text"
              className="form-control form-control-mono"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
            />
          </div>
          <div className="form-group" style={{ textAlign: 'left' }}>
            <label>Title</label>
            <input
              type="text"
              className="form-control form-control-mono"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
            />
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'left', minWidth: '250px' }} className="mono">
          <div style={{ fontSize: '1.25rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            I am
          </div>
          <h2 style={{ fontSize: '2.25rem', fontWeight: '800', margin: '0.25rem 0', lineHeight: 1.2 }}>
            &lt;{name}&gt;
          </h2>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '500', marginTop: '0.5rem', opacity: 0.85 }}>
            &lt;{title}&gt;
          </h3>
          {description && (
            <p style={{ marginTop: '1rem', fontSize: '0.95rem', maxWidth: '400px', lineHeight: 1.5, fontFamily: 'sans-serif' }}>
              {description}
            </p>
          )}
          {askMrNoob && (
            <div style={{ marginTop: '1.5rem', position: 'relative', display: 'inline-block' }}>
              <button 
                className="btn btn-solid mono"
                disabled={!askMrNoob.enabled}
                title={!askMrNoob.enabled ? askMrNoob.disabledMessage : ''}
                style={{
                  opacity: askMrNoob.enabled ? 1 : 0.6,
                  cursor: askMrNoob.enabled ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <MessageSquare size={16} />
                {askMrNoob.label || "Ask MrNoob"}
              </button>
            </div>
          )}
          {mediaLinks.length > 0 && (
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {mediaLinks.map((link, idx) => (
                <a 
                  key={idx} 
                  href={link.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  title={link.label}
                  style={{ color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', border: '1.5px solid #000', transition: 'all 0.2s', textDecoration: 'none' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#000'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#000'; }}
                >
                  {getIconForUrl(link.url, link.label)}
                </a>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Profile Picture */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ProfilePic size={180} />
      </div>
    </div>
  );
}
