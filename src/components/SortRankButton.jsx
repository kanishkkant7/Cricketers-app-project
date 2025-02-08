import React from 'react';
import { PiRankingFill, PiRanking } from "react-icons/pi";
import { useSortContext } from '../context/SortContext';

function SortRankButton() {
    const { sortType, updateSortType, setHighlightState } = useSortContext();

    const handleSortClick = () => {
        // When in None or Ascending state, switch to Descending
        if (sortType !== "Rank Descending") {
            updateSortType("Rank Descending");
            setHighlightState("points");
        } 
        // When in Descending state, switch to Ascending
        else {
            updateSortType("Rank Ascending");
            setHighlightState("points");
        }
    };

    return (
        <div className='bg-gray-800 text-gray-400 font-lexend rounded-full p-4 flex flex-row'>
            <button 
                onClick={handleSortClick}
                className='relative w-[30px] h-[30px] flex items-center justify-center'
            >
                {sortType === "Rank Ascending" ? (
                    <PiRanking size={30}/>
                ) : sortType === "Rank Descending" ? (
                    <PiRankingFill size={30}/>
                ) : (
                    <PiRanking size={30}/>  // Default state shows outline icon
                )}
            </button>
        </div>
    );
}

export default SortRankButton;