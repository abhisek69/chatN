// Menu.js
import React from 'react';

const Menu = ({ isOpen, children }) => {
  return (
    <div className={`fixed top-0 left-0 h-full menu123 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} overflow-y-auto z-40 w-full md:w-[40%]`}>
    {children}
  </div>
  );
};

export default Menu;
