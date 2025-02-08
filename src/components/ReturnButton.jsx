import React from 'react'
import { IoReturnDownBack } from "react-icons/io5"
import { Link } from 'react-router-dom'

function ReturnButton({ returnText = 'Return', pathName = '/' }) {
  return (
    <Link to={pathName} className="inline-block">
      <div className="group relative flex items-center">
        <button className="mt-2 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center 
          hover:bg-blue-700 transition-all duration-500 group-hover:rotate-360 shadow-lg">
          <IoReturnDownBack size={24} className="text-white" />
        </button>
        
        <span className="mt-2 absolute left-full ml-2 whitespace-nowrap text-white
          opacity-0 transform translate-x-[-20px] transition-all duration-500
          group-hover:opacity-100 group-hover:translate-x-0">
          {returnText}
        </span>
      </div>
    </Link>
  )
}

export default ReturnButton