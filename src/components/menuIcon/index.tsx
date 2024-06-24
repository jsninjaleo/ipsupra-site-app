import React from 'react';

interface MenuIconProps {
  openStatus: boolean;
  handleMenu: () => void;
}

export const MenuIcon: React.FC<MenuIconProps> = ({ openStatus, handleMenu }) => {
  return (
    <div 
      className='inline-block cursor-pointer max-sm:absolute max-sm:top-2 max-sm:-right-2' 
      onClick={handleMenu}
    >
      <div className={`w-10 h-1.5 bg-yellow-500 my-1 transition-transform duration-400 
        ${
          openStatus &&
          'transform translate-y-2.5 rotate-[-45deg]'
        }`
      }></div>
      <div className={`w-10 h-1.5 bg-yellow-500 my-1 transition-opacity duration-400 
        ${
          openStatus && 
          'opacity-0'
        }`
      }></div>
      <div className={`w-10 h-1.5 bg-yellow-500 my-1 transition-transform duration-400 
        ${
          openStatus &&
          'transform -translate-y-2.5 rotate-45'
        }`
      }></div>
    </div>
  );
};
