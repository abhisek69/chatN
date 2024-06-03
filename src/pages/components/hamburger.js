import React from 'react';

const HamburgerButton = ({ isActive, toggleButton }) => {
  return (
    <button className="relative flex flex-col justify-around w-10 h-8 bg-transparent border-none cursor-pointer z-50" onClick={toggleButton}>
      <div className={`w-10 h-1 humberger transition-transform duration-300 ${isActive ? 'rotate-[-45deg] translate-y-[10px]' : ''}`}></div>
      <div className={`w-10 h-1 humberger transition-opacity duration-300 ${isActive ? 'opacity-0' : ''}`}></div>
      <div className={`w-10 h-1 humberger transition-transform duration-300 ${isActive ? 'rotate-[45deg] translate-y-[-10px]' : ''}`}></div>
    </button>
  );
};

export default HamburgerButton;