import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Check authentication on component mount using useEffect instead of during render
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  
  return (
    <nav className="bg-amber-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="h-10 w-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-xl">Q</div>
              <div className="ml-2 font-bold text-xl">
                <span className="text-gray-800">QUICK</span>
                <span className="text-amber-500">EAT</span>
              </div>
            </div>
          </div>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={({isActive}) => isActive ? "text-amber-500 px-3 py-2 font-medium" : "text-gray-700 hover:text-amber-500 px-3 py-2 font-medium"}>
              Home
            </NavLink>
            <NavLink to="/AboutUs" className={({isActive}) => isActive ? "text-amber-500 px-3 py-2 font-medium" : "text-gray-700 hover:text-amber-500 px-3 py-2 font-medium"}>
              About Us
            </NavLink>
            <NavLink to="/Menu" className={({isActive}) => isActive ? "text-amber-500 px-3 py-2 font-medium" : "text-gray-700 hover:text-amber-500 px-3 py-2 font-medium"}>
              Menu
            </NavLink>
            <NavLink to="/FAQ" className={({isActive}) => isActive ? "text-amber-500 px-3 py-2 font-medium" : "text-gray-700 hover:text-amber-500 px-3 py-2 font-medium"}>
              FAQ
            </NavLink>
            <NavLink to="/Contact" className={({isActive}) => isActive ? "text-amber-500 px-3 py-2 font-medium" : "text-gray-700 hover:text-amber-500 px-3 py-2 font-medium"}>
              Contacts
            </NavLink>
          </div>
          
          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <button 
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded flex items-center cursor-pointer"
                onClick={() => {
                  localStorage.removeItem("token");
                  setIsLoggedIn(false);
                }}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-2" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm7 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm1 4a1 1 0 102 0V7a1 1 0 10-2 0v4z" clipRule="evenodd" />
                </svg>
                SIGN OUT
              </button>
            ) : (
              <NavLink to="/login">
                <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded flex items-center cursor-pointer">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 mr-2" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  SIGN IN
                </button>
              </NavLink>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-amber-500 focus:outline-none cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink to="/" className={({isActive}) => isActive ? "text-amber-500 block px-3 py-2 font-medium" : "text-gray-700 hover:text-amber-500 block px-3 py-2 font-medium"}>
            Home
          </NavLink>
          <NavLink to="/AboutUs" className={({isActive}) => isActive ? "text-amber-500 block px-3 py-2 font-medium" : "text-gray-700 hover:text-amber-500 block px-3 py-2 font-medium"}>
            About Us
          </NavLink>
          <NavLink to="/Menu" className={({isActive}) => isActive ? "text-amber-500 block px-3 py-2 font-medium" : "text-gray-700 hover:text-amber-500 block px-3 py-2 font-medium"}>
            Menu
          </NavLink>
          <NavLink to="/FAQ" className={({isActive}) => isActive ? "text-amber-500 block px-3 py-2 font-medium" : "text-gray-700 hover:text-amber-500 block px-3 py-2 font-medium"}>
            FAQ
          </NavLink>
          <NavLink to="/Contact" className={({isActive}) => isActive ? "text-amber-500 block px-3 py-2 font-medium" : "text-gray-700 hover:text-amber-500 block px-3 py-2 font-medium"}>
            Contacts
          </NavLink>
        </div>
        
        <div className="px-2 pt-2 pb-3">
          {isLoggedIn ? (
            <button 
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded w-full flex items-center justify-center cursor-pointer"
              onClick={() => {
                localStorage.removeItem("token");
                setIsLoggedIn(false);
              }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm7 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm1 4a1 1 0 102 0V7a1 1 0 10-2 0v4z" clipRule="evenodd" />
              </svg>
              SIGN OUT
            </button>
          ) : (
            <NavLink to="/login" className="w-full block">
              <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded w-full flex items-center justify-center cursor-pointer">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-2" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                SIGN IN
              </button>
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;