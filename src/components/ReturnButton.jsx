//components/ReturnButton.jsx
import React from 'react'
import {IoReturnDownBack} from "react-icons/io5"

function ReturnButton() {
  return (
    <button className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg">
      <IoReturnDownBack size={24} className="text-white" />
    </button>
  )
}

export default ReturnButton