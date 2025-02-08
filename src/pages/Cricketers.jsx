import React, { useState, useEffect, useRef } from "react";
import useTitle from "../hooks/useTitle";
import { useLocation } from "react-router-dom";
import PlayerBar from "../components/PlayerBar";
import Pagination from "../components/Pagination";
import getPlayers from "../data/getPlayers";
import SortRankButton from "../components/SortRankButton";
import SortNameButton from "../components/SortNameButton";
import SortAgeButton from "../components/SortAgeButton";
import SortTypeButton from "../components/SortTypeButton";
import ClearSortShowAll from "../components/ClearSortShowAll";
import { useSortContext } from "../context/SortContext";
import ReturnButton from "../components/ReturnButton";
import gsap from "gsap";

function Cricketers() {
  // States remain the same
  const [players, setPlayers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { sortType, highlightState } = useSortContext();
  const cricketerListLocation = useLocation();
  
  // Create a ref for the container of player bars
  const playerBarsRef = useRef(null);
  
  // Pagination settings
  const itemsPerPage = 10;
  const totalPages = Math.ceil(players.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedPlayers = getSortedPlayers().slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Animation function for player bars
  const animatePlayerBars = () => {
    // First, set initial states of all player bars
    gsap.set(".player-bar", {
      x: -1000, // Start position off-screen to the left
      opacity: 0,
      rotateY: -45 // Slight rotation for 3D effect
    });

    // Create the cascading animation
    gsap.to(".player-bar", {
      x: 0, // Final position
      opacity: 1,
      rotateY: 0,
      duration: 0.8,
      stagger: {
        amount: 0.5, // Total stagger time for all elements
        ease: "power2.out"
      },
      ease: "power4.out",
      clearProps: "all" // Clean up properties after animation
    });
  };

  // Fetch players data
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

  // Trigger animation when displayed players change
  useEffect(() => {
    if (displayedPlayers.length > 0) {
      animatePlayerBars();
    }
  }, [displayedPlayers, currentPage, sortType]); // Re-run animation when these dependencies change

  // Title handling
  useTitle({
    currLocation: cricketerListLocation.pathname,
    path: "/all-cricketers",
    docTitle: "Cricketer List - Cricketer App"
  });

  // Sorting function remains the same
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
        sortedPlayers.sort((a, b) => a.dob - b.dob);
        break;
      case "Age Ascending":
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
          <ClearSortShowAll />
          <ReturnButton returnText="Return to Home" pathName="/" />

        </div>
      </div>
      <div className="w-[75%] mb-3" ref={playerBarsRef}>
        {displayedPlayers.map((item, index) => (
          <div key={item.id} className="player-bar">
            <PlayerBar
              playerName={item.name}
              playerPoints={item.points}
              dob={item.dob}
              playerType={item.type}
              highlightAttribute={highlightState}
            />
          </div>
        ))}
      </div>
      {players.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}

export default Cricketers;