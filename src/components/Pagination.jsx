// components/paginaton.jsx
import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function Pagination({ currentPage = 1, totalPages = 1, onPageChange }) {
  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-4 mt-6 mb-6">
      <button 
        onClick={handlePrevClick}
        disabled={currentPage === 1}
        className="p-2 rounded-full hover:bg-gray-700 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
      >
        <IoIosArrowBack size={25} color={currentPage === 1 ? "#4B5563" : "#fff"} />
      </button>

      <div className="flex items-center space-x-2">
        <span className="text-white font-medium text-lg px-4 py-2 bg-gray-800 rounded-lg">
          {currentPage}
        </span>
        <span className="text-gray-400">of</span>
        <span className="text-gray-400 font-medium">
          {totalPages}
        </span>
      </div>

      <button 
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
        className="p-2 rounded-full hover:bg-gray-700 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
      >
        <IoIosArrowForward size={25} color={currentPage === totalPages ? "#4B5563" : "#fff"} />
      </button>
    </div>
  );
}

export default Pagination;
