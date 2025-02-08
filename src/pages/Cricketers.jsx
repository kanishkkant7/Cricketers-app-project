// pages/Cricketers.jsx
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
import { useGSAP } from "@gsap/react";

function Cricketers() {
  // State management for players, pagination, and sorting
  const [players, setPlayers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { sortType, highlightState } = useSortContext();
  const cricketerListLocation = useLocation();
  const playerBarsRef = useRef(null);

  // Function to sort and filter players based on selected criteria. Changed hoisting
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
      case "none":
        // Return players in original order
        break;
      default:
        break;
    }

    return sortedPlayers;
  }

  // Pagination logic
  const itemsPerPage = 10;
  const totalPages = Math.ceil(players.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedPlayers = getSortedPlayers().slice(startIndex, startIndex + itemsPerPage);

  // Initial data fetching and player type formatting
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

  // Changed from arrow function to useGSAP hook recommended as per GSAP docs for react
  useGSAP(() => {
    const timeline = gsap.timeline();

    timeline.fromTo(".player-bar",
      {
        x: -1000,
        opacity: 0,
        rotateY: -45
      },
      {
        x: 0,
        opacity: 1,
        rotateY: 0,
        duration: 0.8,
        stagger: {
          amount: 0.5,
          ease: "power2.out"
        },
        ease: "power4.out",
        clearProps: "all"
      }
    );
  }, { scope: playerBarsRef, dependencies: [displayedPlayers, currentPage, sortType] });

  // Set page title based on current route
  useTitle({
    currLocation: cricketerListLocation.pathname,
    path: "/all-cricketers",
    docTitle: "Cricketer List - Cricketer App"
  });

  return (
    <div className="flex flex-col items-center font-lexend mb-10">
      {/* Page Header */}
      <span className="text-white text-5xl mt-10 mb-10">Cricketer List</span>

      {/* Sorting Controls Section */}
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

      {/* Player Cards Container with Animation Ref */}
      <div className="w-[75%] mb-3" ref={playerBarsRef}>
        {displayedPlayers.map((item) => (
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

      {/* Pagination Controls */}
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