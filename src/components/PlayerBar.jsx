import React from "react";
import { FaArrowCircleRight } from "react-icons/fa";

function PlayerBar({ playerName, playerPoints, dob }) {
  const playerAge = Math.floor((new Date() - new Date(dob)) / (365.25 * 24 * 60 * 60 * 1000));

  return (
    <div className="text-white bg-gray-800 p-4 rounded-full m-5">
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold mx-2 text-white pb-6 px-4 pt-2">
          {playerName}
          <div className="text-lg font-lexend font-normal text-gray-400 flex flex-row space-x-2">
            <span> Points: {playerPoints} |</span>
            <span> Age: {playerAge} years</span>
          </div>
        </span>
        <button className="mx-2">
          <FaArrowCircleRight size={30} />
        </button>
      </div>
    </div>
  );
}

export default PlayerBar;