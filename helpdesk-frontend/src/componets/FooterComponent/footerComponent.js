import React from 'react';
import { useLocation } from "react-router-dom";
import Logo from '../../images/logo.png';

export default function Footer() {

  const location = useLocation();

  const hideHeader = location.pathname === '/';

  if (hideHeader) {
      return null; // Render nothing if header should be hidden
  }

  return (
    <footer className="py-4 text-sm text-center bg-gray-200">
      <div className="flex items-center justify-center">
        <div className="w-40 h-px mr-2 bg-gray-400"></div> {/* Left line */}
        <p className='font-poppins'>Powered by</p>
        <img src={Logo} alt="SLIIT Logo" className="h-6 mx-2" />
        <div className="w-40 h-px ml-2 bg-gray-400"></div> {/* Right line */}
      </div>
    </footer>
  );
};
