// components/paginaton.jsx
import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

function Pagination() {
  return (
    <div className="text-white font-lexend flex flex-row">
      <button>
        <IoIosArrowBack size={30} />
      </button>
      <span className="">1</span>
      <button>
        <IoIosArrowForward size={30} />
      </button>
    </div>
  );
}

export default Pagination;
