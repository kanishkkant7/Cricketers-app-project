import React, { useState, useEffect } from 'react';
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useDebounce } from 'use-debounce';
import { useSearch } from '../hooks/useSearch';
import { useNavigate } from 'react-router-dom';
import kebabCase from 'lodash/kebabCase';

function SearchBar() {
  // State management for search functionality
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 350);
  const { searchResults, isSearching, searchCricketers } = useSearch();
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  // Handle input changes in search field
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowResults(true);
  };

  // Navigate to player's profile when clicked
  const handlePlayerClick = (playerName) => {
    navigate(`/all-cricketers/${kebabCase(playerName)}`);
    setSearchTerm('');
    setShowResults(false);
  };

  // Perform search when debounced term changes
  useEffect(() => {
    if (debouncedSearchTerm) {
      searchCricketers(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowResults(false);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      {/* Search bar container */}
      <div className="flex items-center bg-gray-900 rounded-full overflow-hidden font-lexend">
        <button 
          className="bg-gray-700 p-2 rounded-full m-2 hover:bg-gray-800 transition-colors 
            focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <HiMagnifyingGlass size={24} className="text-gray-100" />
        </button>
        <input 
          type="text" 
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by name..." 
          className="bg-gray-900 text-white px-2 py-2 outline-none placeholder-gray-400 w-[300px]"
        />
      </div>

      {/* Search results dropdown */}
      {showResults && searchResults.length > 0 && (
        <div className="absolute mt-2 w-full bg-gray-900 rounded-xl shadow-lg overflow-hidden z-50">
          {isSearching ? (
            <div className="p-4 text-gray-400 text-center">Searching...</div>
          ) : (
            <div className="max-h-[300px] overflow-y-auto">
              {searchResults.map((player) => (
                <div
                  key={player.id}
                  onClick={() => handlePlayerClick(player.name)}
                  className="px-4 py-3 hover:bg-gray-800 cursor-pointer transition-colors"
                >
                  <div className="text-white">{player.name}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;