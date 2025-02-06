// components/Navbar.js
import React, { forwardRef } from "react";
import { MdOutlineSportsCricket } from "react-icons/md";
import SearchBar from "./SearchBar";

const Navbar = forwardRef((props, ref) => {
  // We'll create two ref spans to group our elements
  return (
    <div className="font-lexend text-white mx-2 p-3 flex flex-row items-center justify-between">
      <div ref={ref.leftRef} className="flex items-center">
        <MdOutlineSportsCricket size={40} />
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