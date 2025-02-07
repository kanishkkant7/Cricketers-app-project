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
import { useSortContext } from "../context/SortContext";

function Cricketers() {
  // States
  const [players, setPlayers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  //sorting states from context
  const { sortType, highlightState } = useSortContext();

  //Path related
  const cricketerListLocation = useLocation();

  //Pagination settings
  const itemsPerPage = 10;
  const totalPages = Math.ceil(players.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedPlayers = getSortedPlayers().slice(
    startIndex,
    startIndex + itemsPerPage
  );

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

  // Set title to show correct heading in browser tab
  useTitle({
    currLocation: cricketerListLocation.pathname,
    path: "/all-cricketers",
    docTitle: "Cricketer List - Cricketer App"
  });

  function getSortedPlayers() {
    let sortedPlayers = [...players];

    switch (sortType) {
      case "Rank Descending":
        sortedPlayers.sort((a, b) => b.points - a.points);
        break;
      case "Rank Ascending":
        sortedPlayers.sort((a, b) => a.points - b.points);
        break;
      case "Age Descending":
        // For age descending, we want oldest first
        // Since dob is in timestamp format, a smaller number means older age
        sortedPlayers.sort((a, b) => a.dob - b.dob);
        break;
      case "Age Ascending":
        // For age ascending, we want youngest first
        // Since dob is in timestamp format, a larger number means younger age
        sortedPlayers.sort((a, b) => b.dob - a.dob);
        break;
      case "Name Ascending":
        sortedPlayers.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Name Descending":
        sortedPlayers.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "Type: Batsman":
      case "Type: Bowler":
      case "Type: All Rounder":
      case "Type: Wicket Keeper":
        const typeToFilter = sortType.replace("Type: ", "");
        sortedPlayers = sortedPlayers.filter(
          player => player.type === typeToFilter
        );
        break;
      default:
        break;
    }

    return sortedPlayers;
  }

  return (
    <div className="flex flex-col items-center font-lexend mb-10">
      <span className="text-white text-5xl mt-10 mb-10">Cricketer List</span>
      <div className="text-center">
        <span className="text-gray-500">
          Sort players by : <span className="text-white">{sortType}</span>
        </span>
        <div className="flex flex-row space-x-4 p-4">
          <SortRankButton />
          <SortNameButton />
          <SortAgeButton />
          <SortTypeButton />
        </div>
      </div>
      <div className="w-[75%] mb-3">
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
