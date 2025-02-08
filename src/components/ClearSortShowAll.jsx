// components/ClearSortShowAll.jsx
import React from 'react';
import { TbFilterOff } from "react-icons/tb"; // Icon for clearing filters
import { useSortContext } from '../context/SortContext';

function ClearSortShowAll() {
  // Get the updateSortType function from your sort context
  const { updateSortType } = useSortContext();

  // Handler to reset sorting and show all players
  const handleClearSort = () => {
    // Update sort type to null or default state to show all players
    updateSortType("None"); // Set sort type to none when clearing all filters
    setHighlighState(""); // No player attribute to highlight as filters are clear
  };

  return (
    <button
      onClick={handleClearSort}
      className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full
        hover:bg-gray-800 transition-colors duration-300 border border-gray-700
        focus:outline-none focus:ring-2 focus:ring-blue-600"
    >
      {/* Icon with slight right margin */}
      <TbFilterOff className="text-xl" />
      
      {/* Button text */}
      <span>Show All</span>
    </button>
  );
}

export default ClearSortShowAll;