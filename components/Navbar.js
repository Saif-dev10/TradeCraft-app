"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RiMenuLine } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function handleNavigate(path) {
    router.push(path);
    setIsMenuOpen(false); // Close mobile menu on navigation
  }

  return (
    <main>
      <nav className="w-full flex items-center justify-between py-4 px-8 bg-slate-900/70 backdrop-blur-md text-slate-300 border-b border-white/10">

        <div 
          className="text-2xl font-bold cursor-pointer active:opacity-75 text-white tracking-tight"
          onClick={() => handleNavigate("/")}
        >
          TradeCraft
        </div>

        <ul className="hidden lg:flex flex-1 justify-end items-center space-x-8">
          <li 
            className="hover:text-white active:opacity-75 transition-colors duration-200 cursor-pointer font-medium"
            onClick={() => handleNavigate("/")}
          >
            Home
          </li>
          <li 
            className="hover:text-white active:opacity-75 transition-colors duration-200 cursor-pointer font-medium"
            onClick={() => handleNavigate("/about")}
          >
            About
          </li>
          <li 
            className="hover:text-white active:opacity-75 transition-colors duration-200 cursor-pointer font-medium"
            onClick={() => handleNavigate("/services")}
          >
            Services
          </li>
          <li 
            className="hover:text-white active:opacity-75 transition-colors duration-200 cursor-pointer font-medium"
            onClick={() => handleNavigate("/contact")}
          >
            Contact
          </li>
        </ul>

        <div>
          <RiMenuLine 
            className="block text-white text-3xl cursor-pointer lg:hidden"
            onClick={toggleMenu}
          />
        </div>
      
      </nav>
      
      {isMenuOpen && (
        <div className="fixed right-0 top-0 w-64 h-full bg-slate-900/90 backdrop-blur-md text-slate-300 p-8 z-50 lg:hidden">
          <ul className="flex flex-col space-y-10">
            <IoCloseSharp 
              className="text-white text-3xl cursor-pointer"
              onClick={toggleMenu}
            />
            <li 
              className="hover:text-white transition-colors duration-200 cursor-pointer font-medium"
              onClick={() => handleNavigate("/")}
            >
              Home
            </li>
            <li 
              className="hover:text-white transition-colors duration-200 cursor-pointer font-medium"
              onClick={() => handleNavigate("/about")}
            >
              About
            </li>
            <li 
              className="hover:text-white transition-colors duration-200 cursor-pointer font-medium"
              onClick={() => handleNavigate("/services")}
            >
              Services
            </li>
            <li 
              className="hover:text-white transition-colors duration-200 cursor-pointer font-medium"
              onClick={() => handleNavigate("/contact")}
            >
              Contact
            </li>
          </ul>
        </div>
      )}
    </main>
  );
}