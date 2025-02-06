import React from 'react'
import { HiMagnifyingGlass } from "react-icons/hi2"

function SearchBar() {
  const handleSearch = () => {
    console.log("Search button clicked");
  }

  return (
    <div className="flex items-center bg-gray-900 rounded-full overflow-hidden font-lexend">
      <button 
        onClick={handleSearch}
        className="bg-gray-700 p-2 rounded-full m-2 hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        <HiMagnifyingGlass size={24} className="text-gray-100" />
      </button>
      <input 
        type="text" 
        placeholder="Search..." 
        className="bg-gray-900 text-white px-2 py-2 outline-none placeholder-gray-400 w-[200px]"
      />
    </div>
  )
}

export default SearchBar