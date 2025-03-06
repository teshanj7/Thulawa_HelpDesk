import React from "react";
import { FaSearch } from "react-icons/fa";
import Logo2 from '../../images/logo2.png';

export default function SearchBar() {
  return (
    <div>
      {/* Search Bar Section */}
      <div className="flex flex-col items-center py-16 bg-blue-500">
        <div className="relative w-2/3">
          <input
            type="text"
            placeholder="How can we help you today?"
            className="w-full p-3 pl-10 rounded-md shadow-md outline-none"
          />
          <FaSearch className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
        </div>
      </div>
      
      {/* Breadcrumbs Section */}
      <div className="flex items-center px-6 py-3 bg-white shadow-md">
        <img
          src={Logo2}
          alt="Breadcrumb Icon"
          className="w-16 h-10 mr-1"
        />
        <nav className="space-x-1 text-sm text-gray-600">
          <a href="/" className="text-blue-600 hover:underline">Help Center</a>
          <span className="text-gray-500">{">"}</span>
          <a href="/" className="text-blue-600 hover:underline">Your Account</a>
          <span className="text-gray-500">{">"}</span>
          <span className="font-medium text-black">Profile</span>
        </nav>
      </div>
    </div>
  );
}
