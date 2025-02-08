//componenets/SortNameButton.jsx
import React from 'react';
import { RiSortAlphabetAsc, RiSortAlphabetDesc } from "react-icons/ri";
import { useSortContext } from '../context/SortContext';

function SortNameButton() {
    const { sortType, updateSortType, setHighlightState } = useSortContext();

    const handleNameSort = () => {
        // When not in descending, switch to descending (Z to A)
        if (sortType !== "Name Descending") {
            updateSortType("Name Descending");
            setHighlightState("name");
        } else {
            // When in descending, switch to ascending (A to Z)
            updateSortType("Name Ascending");
            setHighlightState("name");
        }
    };

    return (
        <div className='bg-gray-800 text-gray-400 font-lexend rounded-full p-4 flex flex-row'>
            <button 
                onClick={handleNameSort}
                className='relative w-[30px] h-[30px] flex items-center justify-center'
            >
                <div className="transition-all duration-300">
                    {sortType === "Name Ascending" ? (
                        <RiSortAlphabetAsc size={30} className="transform transition-transform duration-300"/>
                    ) : sortType === "Name Descending" ? (
                        <RiSortAlphabetDesc size={30} className="transform transition-transform duration-300"/>
                    ) : (
                        <RiSortAlphabetAsc size={30} className="transform transition-transform duration-300"/>
                    )}
                </div>
            </button>
        </div>
    );
}

export default SortNameButton;