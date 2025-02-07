import React, { useState } from 'react'
import { RiSortAlphabetAsc } from "react-icons/ri";
import { RiSortAlphabetDesc } from "react-icons/ri";

function SortNameButton() {
    const [sortByName, setSortByName] = useState(false);

    return (
        <div className='bg-gray-800 text-gray-400 font-lexend rounded-full p-4 flex flex-row'>
            <button 
                onClick={() => setSortByName(!sortByName)}
                className='relative'
            >
                <div className={`absolute transition-opacity duration-300 ${sortByName ? 'opacity-100' : 'opacity-0'}`}>
                    <RiSortAlphabetAsc size={30}/> 
                </div>
                <div className={`transition-opacity duration-300 ${sortByName ? 'opacity-0' : 'opacity-100'}`}>
                    <RiSortAlphabetDesc size={30}/>
                </div>
            </button>
        </div>
    )
}

export default SortNameButton;