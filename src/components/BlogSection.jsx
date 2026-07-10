import React, { useState } from 'react';
import { Plus, ArrowLeft, Save, X } from 'lucide-react';
import BlogCard from './BlogCard';

// Custom React-based Markdown parser
export function renderMarkdown(markdown) {
  if (!markdown) return [];
  
  const lines = markdown.split('\n');
  const elements = [];
  let inCodeBlock = false;
  let codeBlockLines = [];
  let inList = false;
  let listItems = [];

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} style={{ listStyleType: 'square', paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
          {listItems.map((item, idx) => <li key={idx} style={{ marginBottom: '0.35rem' }}>{item}</li>)}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Handle code blocks
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <pre key={`code-${elements.length}`} style={{ backgroundColor: '#000', color: '#fff', padding: '1.25rem', overflowX: 'auto', marginBottom: '1.5rem', border: '1px solid #000' }}>
            <code className="mono">{codeBlockLines.join('\n')}</code>
          </pre>
        );
        codeBlockLines = [];
        inCodeBlock = false;
      } else {
        flushList();
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockLines.push(line);
      continue;
    }

    // Handle bullet lists
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      inList = true;
      listItems.push(line.replace(/^[-*]\s+/, ''));
      continue;
    } else if (inList && line.trim() !== '') {
      flushList();
    }

    // Handle headers
    if (line.trim().startsWith('### ')) {
      flushList();
      elements.push(<h3 key={i} style={{ fontSize: '1.25rem', fontWeight: '800', marginTop: '1.5rem', marginBottom: '0.75rem', textTransform: 'uppercase' }}>{line.replace('### ', '')}</h3>);
    } else if (line.trim().startsWith('## ')) {
      flushList();
      elements.push(<h2 key={i} style={{ fontSize: '1.5rem', fontWeight: '800', marginTop: '2rem', marginBottom: '1rem', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '0.25rem' }}>{line.replace('## ', '')}</h2>);
    } else if (line.trim().startsWith('# ')) {
      flushList();
      elements.push(<h1 key={i} style={{ fontSize: '1.75rem', fontWeight: '800', marginTop: '2rem', marginBottom: '1rem', textTransform: 'uppercase' }}>{line.replace('# ', '')}</h1>);
    } else if (line.trim() === '') {
      flushList();
    } else {
      flushList();
      // Inline code rendering
      const parts = line.split(/(`[^`]+`)/g);
      const renderedLine = parts.map((part, idx) => {
        if (part.startsWith('`') && part.endsWith('`')) {
          return <code key={idx} style={{ backgroundColor: '#000', color: '#fff', padding: '0.15rem 0.35rem', fontSize: '0.85rem' }} className="mono">{part.slice(1, -1)}</code>;
        }
        return part;
      });
      elements.push(<p key={i} style={{ marginBottom: '1.25rem' }}>{renderedLine}</p>);
    }
  }

  flushList();
  return elements;
}

export default function BlogSection({ blogs, isEditing, onSaveBlog, onDeleteBlog }) {
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formExcerpt, setFormExcerpt] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formDate, setFormDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  const selectedBlog = blogs.find(b => b.id === selectedBlogId);

  const startCreate = () => {
    setFormTitle('');
    setFormExcerpt('');
    setFormContent('');
    setFormDate(new Date().toISOString().split('T')[0]);
    setIsCreatingNew(true);
    setEditingBlog(null);
  };

  const startEdit = (blog) => {
    setEditingBlog(blog);
    setFormTitle(blog.title);
    setFormExcerpt(blog.excerpt);
    setFormContent(blog.content);
    setFormDate(blog.date);
    setIsCreatingNew(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formTitle || !formContent) {
      alert('Title and Content are required!');
      return;
    }

    const payload = {
      title: formTitle,
      excerpt: formExcerpt || formContent.slice(0, 120) + '...',
      content: formContent,
      date: formDate
    };

    let success;
    if (editingBlog) {
      success = await onSaveBlog(editingBlog.id, payload, true);
    } else {
      success = await onSaveBlog(null, payload, false);
    }

    if (success) {
      setIsCreatingNew(false);
      setEditingBlog(null);
    }
  };

  const handleDelete = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      const success = await onDeleteBlog(blogId);
      if (success) {
        if (selectedBlogId === blogId) {
          setSelectedBlogId(null);
        }
        setIsCreatingNew(false);
        setEditingBlog(null);
      }
    }
  };

  // Editor View Layout
  if (isEditing && (isCreatingNew || editingBlog)) {
    return (
      <div className="blog-layout">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid #000', paddingBottom: '0.75rem' }}>
          <h2 className="mono" style={{ textTransform: 'uppercase', fontSize: '1.25rem' }}>
            {editingBlog ? 'Edit Blog Post' : 'New Blog Post'}
          </h2>
          <button className="btn btn-sm" onClick={() => { setIsCreatingNew(false); setEditingBlog(null); }}>
            <X size={14} /> Close
          </button>
        </div>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g., Understanding Automation Locators"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              className="form-control"
              value={formDate}
              onChange={(e) => setFormDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Excerpt / Summary</label>
            <input
              type="text"
              className="form-control"
              placeholder="Brief summary of the article..."
              value={formExcerpt}
              onChange={(e) => setFormExcerpt(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Content (Markdown Supported)</label>
            <textarea
              className="form-control form-control-mono"
              placeholder="Use markdown headers (##), bold text, bullet points (-), and code blocks (```) for formatting."
              value={formContent}
              onChange={(e) => setFormContent(e.target.value)}
              style={{ minHeight: '300px' }}
              required
            ></textarea>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="submit" className="btn btn-solid">
              Save Post
            </button>
            <button type="button" className="btn" onClick={() => { setIsCreatingNew(false); setEditingBlog(null); }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Single Blog Details Viewer
  if (selectedBlog) {
    return (
      <div className="blog-layout">
        <div style={{ marginBottom: '2rem' }}>
          <button className="btn btn-sm" onClick={() => setSelectedBlogId(null)}>
            <ArrowLeft size={14} /> Back to Blogs
          </button>
        </div>

        <article>
          <div className="blog-post-header">
            <div className="blog-date mono">{selectedBlog.date}</div>
            <h1 className="blog-post-title">{selectedBlog.title}</h1>
            <div className="blog-post-meta mono">
              WRITTEN BY PRANAVA THEJASWI N M
              {isEditing && (
                <span style={{ marginLeft: '1.5rem', display: 'inline-flex', gap: '0.75rem' }}>
                  <button className="btn btn-sm" onClick={() => startEdit(selectedBlog)}>
                    Edit
                  </button>
                  <button className="btn btn-sm" style={{ color: 'red', borderColor: 'red' }} onClick={() => handleDelete(selectedBlog.id)}>
                    Delete
                  </button>
                </span>
              )}
            </div>
          </div>

          <div className="blog-post-content">
            {renderMarkdown(selectedBlog.content)}
          </div>
        </article>
      </div>
    );
  }

  // Default List View
  return (
    <div className="blog-layout">
      <div className="blog-header-row">
        <h2 className="mono" style={{ textTransform: 'uppercase', fontSize: '1.5rem' }}>Notebook / Blogs</h2>
        {isEditing && (
          <button className="btn btn-solid btn-sm" onClick={startCreate}>
            <Plus size={14} /> Create Post
          </button>
        )}
      </div>

      {blogs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', border: '1px solid #000' }}>
          <p className="mono">No posts available.</p>
        </div>
      ) : (
        <div className="blog-list">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              isEditing={isEditing}
              onSelect={setSelectedBlogId}
              onEdit={startEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
