// components/SortTypeButton.jsx
import React from 'react';
import { BiCricketBall } from "react-icons/bi";
import { GiCricketBat } from "react-icons/gi";
import { MdSportsCricket } from "react-icons/md";
import { GiWinterGloves } from "react-icons/gi";
import { useSortContext } from '../context/SortContext';

function SortTypeButton() {
    const { sortType, updateSortType, setHighlightState } = useSortContext();

    const handleTypeClick = () => {
        // Created a cycle between the four player types
        // The logic follows: Batsman -> Bowler -> All Rounder -> Wicket Keeper -> back to Batsman
        // The icons are self explanatory
        switch(sortType) {
            case "Type: Batsman":
                updateSortType("Type: Bowler");
                setHighlightState("type");
                break;
            case "Type: Bowler":
                updateSortType("Type: All Rounder");
                setHighlightState("type");
                break;
            case "Type: All Rounder":
                updateSortType("Type: Wicket Keeper");
                setHighlightState("type");
                break;
            case "Type: Wicket Keeper":
                updateSortType("Type: Batsman");
                setHighlightState("type");
                break;
            default:
                // This case handles the initial "None" state or any unexpected states
                // It starts the cycle with Batsman
                updateSortType("Type: Batsman");
                setHighlightState("type");
        }
    };

    return (
        <div className='bg-gray-800 text-gray-400 font-lexend rounded-full p-4 flex flex-row'>
            <button 
                onClick={handleTypeClick}
                className='relative w-[30px] h-[30px] flex items-center justify-center'
            >
                <div className="transition-all duration-300">
                    {sortType === "Type: Batsman" ? (
                        <GiCricketBat size={30} className="transform transition-transform duration-300"/>
                    ) : sortType === "Type: Bowler" ? (
                        <BiCricketBall size={30} className="transform transition-transform duration-300"/>
                    ) : sortType === "Type: All Rounder" ? (
                        <MdSportsCricket size={30} className="transform transition-transform duration-300"/>
                    ) : sortType === "Type: Wicket Keeper" ? (
                        <GiWinterGloves size={30} className="transform transition-transform duration-300"/>
                    ) : (
                        // This is our initial state icon when sortType is "None"
                        <MdSportsCricket size={30} className="transform transition-transform duration-300"/>
                    )}
                </div>
            </button>
        </div>
    );
}

export default SortTypeButton;