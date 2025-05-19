import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
      
        <div className="text-2xl font-bold text-blue-600 tracking-tight">
          Straut
        </div>

        
        <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
          <li className=""><Link className='hover:text-blue-600 transition duration-300 cursor-pointer' to={'/'}>Home </Link></li>
          <li className=""><Link className='hover:text-blue-600 transition duration-300 cursor-pointer' to={'/about'}>about </Link></li>
          <li className=""><Link className='hover:text-blue-600 transition duration-300 cursor-pointer' to={'/profile'}>profile </Link></li>
          
        </ul>

        
        <div className="hidden md:block">
          <Link to={'signup'} className="bg-blue-600 text-white px-5 py-2 rounded-full shadow hover:bg-blue-700 transition duration-300">
            Get Started
          </Link>
        </div>

      
        <div className="md:hidden">
          <button className="text-gray-700 hover:text-blue-600">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
