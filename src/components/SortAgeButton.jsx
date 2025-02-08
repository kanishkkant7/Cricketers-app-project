// components/SortAgeButton.jsx
import React from 'react';
import { FaHourglassStart, FaHourglassEnd } from "react-icons/fa";
import { useSortContext } from '../context/SortContext';

function SortAgeButton() {
    const { sortType, updateSortType, setHighlightState } = useSortContext();

    const handleAgeSort = () => {
        // When in None or Ascending state, switch to Descending (oldest first)
        if (sortType !== "Age Descending") {
            updateSortType("Age Descending");
            setHighlightState("age");
        } 
        // When in Descending state, switch to Ascending (youngest first)
        else {
            updateSortType("Age Ascending");
            setHighlightState("age");
        }
    };

    return (
        <div className='bg-gray-800 text-gray-400 font-lexend rounded-full p-4 flex flex-row'>
            <button 
                onClick={handleAgeSort}
                className='relative w-[30px] h-[30px] flex items-center justify-center'
            >
                <div className="transition-all duration-300">
                    {sortType === "Age Ascending" ? (
                        // Show hourglass start for ascending (less sand = younger first)
                        <FaHourglassStart size={30} className="transform transition-transform duration-300"/>
                    ) : sortType === "Age Descending" ? (
                        // Show hourglass end for descending (more sand = older first)
                        <FaHourglassEnd size={30} className="transform transition-transform duration-300"/>
                    ) : (
                        // Default state shows start hourglass
                        <FaHourglassStart size={30} className="transform transition-transform duration-300"/>
                    )}
                </div>
            </button>
        </div>
    );
}

export default SortAgeButton;