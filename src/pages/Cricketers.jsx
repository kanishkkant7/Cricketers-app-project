import React, { useState, useEffect } from "react";
import useTitle from "../hooks/useTitle";
import { useLocation } from "react-router-dom";
import PlayerBar from "../components/PlayerBar";
import Pagination from "../components/Pagination";
import getPlayers from "../data/getPlayers";
import SortRankButton from "../components/SortRankButton";
import SortNameButton from "../components/SortNameButton";
import SortAgeButton from "../components/SortAgeButton";
import SortTypeButton from "../components/SortTypeButton";

function Cricketers() {
  // States
  const [players, setPlayers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [highlightState,setHighlightState]=useState("")
  const [sortType, setSortType] = useState("None");

  //Path related
  const cricketerListLocation = useLocation();

  //Pagination settings
  const itemsPerPage = 10;
  const totalPages = Math.ceil(players.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedPlayers = players.slice(startIndex, startIndex + itemsPerPage);

  // Fetch players from players.js using getPlayers()
  useEffect(() => {
    async function fetchPlayers() {
      const data = await getPlayers();
      const playersWithTypes = data.map(player => ({
        ...player,
        type:
          player.type === "allRounder"
            ? "All Rounder"
            : player.type === "batsman"
              ? "Batsman"
              : player.type === "bowler"
                ? "Bowler"
                : player.type === "wicketKeeper"
                  ? "Wicket Keeper"
                  : "Not Available"
      }));
      setPlayers(playersWithTypes);
    }
    fetchPlayers();
  }, []);

  useTitle({
    currLocation: cricketerListLocation.pathname,
    path: "/all-cricketers",
    docTitle: "Cricketer List - Cricketer App"
  });

  return (
    <div className="flex flex-col items-center font-lexend mb-10">
      <span className="text-white text-5xl mt-10 mb-10">Cricketer List</span>
      <div className="text-center">
        <span className="text-gray-500">Sort players by : <span className="text-white">{sortType}</span></span>
        <div className="flex flex-row space-x-4 p-4">
          <SortRankButton />
          <SortNameButton />
          <SortAgeButton />
          <SortTypeButton/>
        </div>
      </div>
      <div className="w-[75%] mb-3">
        {/* PlayerBar Component to show player details */}
        {displayedPlayers.map(item =>
          <PlayerBar
            key={item.id}
            playerName={item.name}
            playerPoints={item.points}
            dob={item.dob}
            playerType={item.type}
            highlightAttribute={highlightState}
          />
        )}
      </div>
      {/* Handle pagination here */}
      {players.length > 0 &&
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />}
    </div>
  );
}

export default Cricketers;
