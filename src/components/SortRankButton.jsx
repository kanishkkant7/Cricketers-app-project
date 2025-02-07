import React, { useState } from 'react'
import { PiRankingFill } from "react-icons/pi";
import { PiRanking } from "react-icons/pi";

function SortRankButton({}) {
    const [sortByRank, setSortByRank] = useState(false);

    return (
        <div className='bg-gray-800 text-gray-400 font-lexend rounded-full p-4 flex flex-row'>
            <button 
                onClick={() => setSortByRank(!sortByRank)}
                className='relative'
            >
                <div className={`absolute transition-opacity duration-300 ${sortByRank ? 'opacity-100' : 'opacity-0'}`}>
                    <PiRanking size={30}/> 
                </div>
                <div className={`transition-opacity duration-300 ${sortByRank ? 'opacity-0' : 'opacity-100'}`}>
                    <PiRankingFill size={30}/>
                </div>
            </button>
        </div>
    )
}

export default SortRankButton;