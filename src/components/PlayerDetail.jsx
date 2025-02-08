import React from "react";
import ReturnButton from "./ReturnButton";

function PlayerDetail({ cricketer, formatPlayerType, formatDate }) {
  return (
    // Main container - sets max width and centers content
    <div className="w-full max-w-5xl mx-auto mb-20">
      {/* Player Name Banner - Creates a prominent header */}
      <h1 className="text-4xl font-bold mb-6 bg-gray-900 p-7 rounded-full underline px-8 text-center text-white">
        {cricketer.name}
      </h1>

      {/* Player Details Card - Contains all player information */}
      <div className="bg-gray-900 rounded-3xl p-12 shadow-xl text-white">
        {/* Grid layout for organizing player details */}
        <div className="grid gap-6">
          {/* First Row: Player Type and Return Button */}
          <div className="flex justify-between items-start">
            {/* Player Type Information */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Player Type</h2>
              <p className="text-gray-300 text-lg">
                {formatPlayerType(cricketer.type)}
              </p>
            </div>
            {/* Return Button - Positioned in the top right */}
            <div className="mt-1 mr-40">
              <ReturnButton returnText="Return to All Cricketers" pathName="/all-cricketers" />

            </div>
          </div>

          {/* Points Information */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Points</h2>
            <p className="text-gray-400 text-lg">
              {cricketer.points}
            </p>
          </div>

          {/* Date of Birth Information */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Date of Birth</h2>
            <p className="text-gray-400 text-lg">
              {formatDate(cricketer.dob)}
            </p>
          </div>

          {/* Player Rank Information */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Rank</h2>
            <p className="text-gray-400 text-lg">
              #{cricketer.rank}
            </p>
          </div>

          {/* Player Description/About Section */}
          <div>
            <h2 className="text-xl font-semibold mb-2">About</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              {cricketer.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerDetail;
