// components/Navbar.jsx
import React, { forwardRef } from "react"; //forward refs to add animation
import { MdOutlineSportsCricket } from "react-icons/md";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

const Navbar = forwardRef((props, ref) => {
  return (
    <div className="font-lexend text-white mx-2 p-3 flex flex-row items-center justify-between">
      <div ref={ref.leftRef} className="flex items-center">
        {/* The Link component now serves as our hover group container */}
        <Link to="/" className="flex items-center group">
          {/* The icon wrapper uses group-hover to change color */}
          <div className="transition-colors duration-200 text-white group-hover:text-blue-400">
            <MdOutlineSportsCricket size={40} />
          </div>
          {/* The text now matches the icon's transition timing */}
          <span className="mx-7 text-4xl transition-all duration-200 group-hover:text-blue-400 group-hover:scale-110 origin-left">
            Cricketer App
          </span>
        </Link>
      </div>
      <div ref={ref.rightRef}>
        <SearchBar />
      </div>
    </div>
  );
});


export default Navbar;