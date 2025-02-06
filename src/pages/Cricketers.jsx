import React from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import players from "../data/players";
import useTitle from "../hooks/useTitle";
import { useLocation } from "react-router-dom";

function Cricketers() {

const cricketerListLocation = useLocation();

  useTitle({
    currLocation: cricketerListLocation.pathname,  
    path: "/all-cricketers",                        
    docTitle: "Cricketer List"  
  });


  return (
    <div className="flex flex-col items-center font-lexend mb-10">
      <span className="text-white text-5xl mt-10 mb-10">Cricketer List</span>
      <div className="w-[65%] mb-3">
        {players.map(item =>
          <div className="text-white bg-gray-800 p-4 rounded-full m-5">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold mx-2">
                {item.name}
              </span>
              <button className="mx-2">
                <FaArrowCircleRight size={30} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cricketers;
