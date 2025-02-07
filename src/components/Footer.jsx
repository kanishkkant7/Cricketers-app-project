//components/Footer.jsx
import React from "react";
import { MdOutlineSportsCricket } from "react-icons/md";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 font-lexend">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-6 flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2">
              <MdOutlineSportsCricket size={24} className="text-blue-600" />
              <span className="text-xl font-semibold">Cricketer App</span>
            </div>
            <p className="mt-4 text-gray-400 text-sm">
              Your ultimate destination for cricket statistics and player analysis.
            </p>
          </div>

          <div className="hidden md:block md:col-span-2"></div>

          <div className="col-span-12 md:col-span-4 flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <FaGithub size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Copyright Text */}
        <div className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Cricketer App. Made by Kanishk Kant.
        </div>
      </div>
    </footer>
  );
}

export default Footer;