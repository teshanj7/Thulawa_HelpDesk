import React, { useState, useContext } from 'react';
import { useLocation, Link } from "react-router-dom";
import { FaChevronDown, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import Logo from '../../images/logo.png';
import useAuth from '../../hooks/useLogin';
import UserContext from '../../ContextComponent/ContextComponent';

export default function Header() {

  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { logout } = useAuth();
  const { user } = useContext(UserContext);

  const hideHeader = location.pathname === '/';

  if (hideHeader) {
      return null; // Render nothing if header should be hidden
  }

  // Logout function
  const handleLogout = () => {
    logout();
  };

  return (
      <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="flex items-center space-x-4">
        <Link to="/home" className="flex items-center space-x-2">
          <img src={Logo} alt="SLIIT Logo" className="h-10" />
          <h1 className="text-lg font-semibold font-poppins">Uni HelpDesk</h1>
        </Link>
      </div>
      <div className="relative">
        <button
          className="flex items-center px-4 py-2 space-x-2 font-poppins text-white bg-blue-500 rounded-md"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <span>{user.UserType === 'student'
                      ? user.Fullname
                      : user.UserType === 'admin'
                      ? user.Adminname
                      : 'Unknown'}</span>
          <FaChevronDown />
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 w-48 mt-2 bg-white border rounded-md shadow-lg font-poppins">
            <ul className="py-2">
              <li className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={(e) => {
                e.preventDefault();
                window.location.href = `/profile/${user._id}`
              }}>
                <FaUserCircle className="inline mr-2" /> Profile
              </li>
              <li className="px-4 py-2 text-red-600 cursor-pointer hover:bg-gray-100" onClick={handleLogout}>
                <FaSignOutAlt className="inline mr-2" /> Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};
