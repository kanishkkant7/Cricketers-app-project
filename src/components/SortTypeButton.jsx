import React from 'react'
import { BiCricketBall } from "react-icons/bi";  // For bowlers
import { GiCricketBat } from "react-icons/gi";   // For batsmen
import { MdSportsCricket } from "react-icons/md"; // For all rounders
import { GiWinterGloves } from "react-icons/gi";  // For wicket keepers

function SortTypeButton({ sortType, setSortType, setHighlightState }) {
    const handleTypeClick = () => {
        switch(sortType) {
            case "None":
                setSortType("Type: Batsman");
                setHighlightState("type");
                break;
            case "Type: Batsman":
                setSortType("Type: Bowler");
                setHighlightState("type");
                break;
            case "Type: Bowler":
                setSortType("Type: All Rounder");
                setHighlightState("type");
                break;
            case "Type: All Rounder":
                setSortType("Type: Wicket Keeper");
                setHighlightState("type");
                break;
            default:
                setSortType("None");
                setHighlightState("");
        }
    };

    const getCurrentIcon = () => {
        switch(sortType) {
            case "Type: Batsman":
                return <GiCricketBat size={30}/>;
            case "Type: Bowler":
                return <BiCricketBall size={30}/>;
            case "Type: All Rounder":
                return <MdSportsCricket size={30}/>;
            case "Type: Wicket Keeper":
                return <GiWinterGloves size={30}/>;
            default:
                return <MdSportsCricket size={30}/>;
        }
    };

    return (
        <div className='bg-gray-800 text-gray-400 font-lexend rounded-full p-4 flex flex-row'>
            <button 
                onClick={handleTypeClick}
                className='relative hover:text-white transition-colors duration-300'
            >
                <div className={`transition-all duration-300 transform ${sortType !== "None" ? 'scale-110' : 'scale-100'}`}>
                    {getCurrentIcon()}
                </div>
            </button>
        </div>
    )
}

export default SortTypeButton;