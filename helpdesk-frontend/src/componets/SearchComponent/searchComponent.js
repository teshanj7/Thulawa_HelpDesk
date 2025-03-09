import React from "react";
import { FaSearch } from "react-icons/fa";

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
    </div>
  );
}
