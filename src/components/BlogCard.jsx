import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

export default function BlogCard({ blog, isEditing, onSelect, onEdit, onDelete }) {
  const { date, title, excerpt, id } = blog;

  return (
    <div className="blog-card">
      <div className="blog-date mono">{date}</div>
      <h3 className="blog-title">
        <a 
          href={`#blog-${id}`} 
          onClick={(e) => { 
            e.preventDefault(); 
            onSelect(id); 
          }}
        >
          {title}
        </a>
      </h3>
      <p className="blog-excerpt">{excerpt}</p>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button 
          className="btn btn-sm" 
          onClick={() => onSelect(id)}
        >
          Read Post &rarr;
        </button>
        
        {isEditing && (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              className="btn btn-sm" 
              onClick={() => onEdit(blog)}
              title="Edit Post"
            >
              <Edit2 size={12} />
            </button>
            <button 
              className="btn btn-sm" 
              style={{ color: 'red', borderColor: 'red' }} 
              onClick={() => onDelete(id)}
              title="Delete Post"
            >
              <Trash2 size={12} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
