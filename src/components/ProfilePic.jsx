import React from 'react';
import profilePic from '../../images/profile.jpg';

export default function ProfilePic({ size = 180 }) {
  return (
    <div 
      style={{
        width: `${size}px`,
        height: `${size}px`,
        border: '2px solid #000',
        backgroundColor: '#fff',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '6px 6px 0px #000', // A slightly larger shadow offset for the larger image
        transition: 'all 0.3s ease',
      }}
      className="profile-pic-container"
    >
      <img 
        src={profilePic} 
        alt="Pranava Thejaswi" 
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'all 0.3s ease'
        }}
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />
    </div>
  );
}
