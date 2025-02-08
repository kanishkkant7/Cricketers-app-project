// components/PlayerBar.jsx
import React from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import kebabCase from "lodash/kebabCase";

function PlayerBar({ playerName, playerPoints, dob, playerType, highlightAttribute = "None" }) {
    // Initialize the navigate function from React Router
    const navigate = useNavigate();

    // Calculate player age from the timestamp
    const playerAge = Math.floor(
        (new Date() - new Date(dob)) / (365.25 * 24 * 60 * 60 * 1000)
    );

    // Handle click to navigate to player detail page
    const handlePlayerClick = () => {
        // Convert player name to URL-friendly format using kebabCase
        const playerSlug = kebabCase(playerName);
        // Navigate to the player's detail page
        navigate(`/all-cricketers/${playerSlug}`);
    };

    return (
        <div className="transform-gpu">
        <div className="text-white bg-gray-800 p-4 rounded-full m-5">
            <div className="flex justify-between items-center">
                <span className="text-2xl font-bold mx-2 text-white pb-6 px-4 pt-2">
                    {playerName}
                    <div className="text-lg font-lexend font-normal text-gray-500 flex flex-row space-x-2">
                        <span className={`${highlightAttribute === "points" ? "text-gray-200" : ""}`}>
                            Points: {playerPoints} |
                        </span>
                        <span className={`${highlightAttribute === "age" ? "text-gray-200" : ""}`}>
                            Age: {playerAge} years |
                        </span>
                        <span className={`${highlightAttribute === "type" ? "text-gray-200" : ""}`}>
                            Type: {playerType}
                        </span>
                    </div>
                </span>
                <button 
                    className="mx-2 hover:text-blue-400 transition-colors duration-200" 
                    onClick={handlePlayerClick}
                    aria-label={`View details for ${playerName}`}
                >
                    <FaArrowCircleRight size={30} />
                </button>
            </div>
        </div>
        </div>
    );
}

export default PlayerBar;