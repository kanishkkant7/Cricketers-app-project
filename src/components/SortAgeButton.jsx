import React, { useState } from 'react'
import { FaHourglassStart } from "react-icons/fa";
import { FaHourglassEnd } from "react-icons/fa";

function SortAgeButton() {
    const [sortByAge, setSortByAge] = useState(false);

    return (
        <div className='bg-gray-800 text-gray-400 font-lexend rounded-full p-4 flex flex-row'>
            <button 
                onClick={() => setSortByAge(!sortByAge)}
                className='relative'
            >
                <div className={`absolute transition-opacity duration-300 ${sortByAge ? 'opacity-100' : 'opacity-0'}`}>
                    <FaHourglassStart size={30}/> 
                </div>
                <div className={`transition-opacity duration-300 ${sortByAge ? 'opacity-0' : 'opacity-100'}`}>
                    <FaHourglassEnd size={30}/>
                </div>
            </button>
        </div>
    )
}

export default SortAgeButton;