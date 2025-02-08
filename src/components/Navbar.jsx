// components/Navbar.jsx
import React, { forwardRef } from "react"; //forward refs to add animation
import { MdOutlineSportsCricket } from "react-icons/md";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

const Navbar = forwardRef((props, ref) => {
  return (
    <div className="font-lexend text-white mx-2 p-3 flex flex-row items-center justify-between">
      <div ref={ref.leftRef} className="flex items-center">
      <Link to="/">
        <MdOutlineSportsCricket size={40} />
        </Link>
        <span className="mx-7 text-4xl">Cricketer App</span>
      </div>
      <div ref={ref.rightRef}>
        <SearchBar />
      </div>
    </div>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;