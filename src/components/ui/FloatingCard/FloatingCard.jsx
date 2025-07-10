import React from 'react';

const FloatingCard = ({ children, className = "", delay = 0 }) => {
  const containerStyles = {
    animation: `float 6s ease-in-out infinite`,
    animationDelay: `${delay}s`
  };

  return (
    <div style={containerStyles} className={className}>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(-5px) rotate(-1deg); }
        }
      `}</style>
      {children}
    </div>
  );
};

export default FloatingCard;
