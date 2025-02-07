// pages/Cricketers.jsx
import React from "react";
import players from "../data/players";
import useTitle from "../hooks/useTitle";
import { useLocation } from "react-router-dom";
import PlayerBar from "../components/PlayerBar";
import Pagination from "../components/Pagination";


function Cricketers() {
  const cricketerListLocation = useLocation();

  useTitle({
    currLocation: cricketerListLocation.pathname,
    path: "/all-cricketers",
    docTitle: "Cricketer List - Cricketer App"
  });

  return (
    <>
    <div className="flex flex-col items-center font-lexend mb-10">
      <span className="text-white text-5xl mt-10 mb-10">Cricketer List</span>
      <div className="w-[75%] mb-3">
        {players.map(item => <PlayerBar key={item.id} playerName={item.name} playerPoints={item.points} dob={item.dob}/>)}
      </div>
    </div>
    <Pagination/>
    </>
  );
}

export default Cricketers;
