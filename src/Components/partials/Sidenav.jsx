import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Sidenav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden bg-[#1A1A1A] text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <i className="text-[#6556CD] ri-tv-fill mr-2"></i> Movie App
        </h1>
        <button onClick={() => setIsOpen(!isOpen)}>
          <i className={`ri-${isOpen ? "close-fill" : "menu-fill"} text-2xl`}></i>
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed md:static top-0 left-0 z-50 bg-[#1A1A1A] h-full w-[70%] md:w-[20%] border-r-2 border-zinc-400 p-5 md:p-10 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <h1 className='text-2xl text-white font-bold mb-6'>
          <i className="text-[#6556CD] ri-tv-fill mr-2"></i>
          Movie App.
        </h1>

        <nav className='flex flex-col text-zinc-400 text-xl gap-3'>
          <h1 className='text-white font-semibold text-xl mt-5 mb-3'>New Feeds</h1>
          <Link to='/trending' onClick={() => setIsOpen(false)} className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3">
            <i className="mr-2 ri-fire-fill"></i>Trending
          </Link>
          <Link to='/popular' onClick={() => setIsOpen(false)} className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3">
            <i className="mr-2 ri-bard-fill"></i>Popular
          </Link>
          <Link to='/movie' onClick={() => setIsOpen(false)} className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3">
            <i className="mr-2 ri-movie-2-fill"></i>Movies
          </Link>
          <Link to='/tv' onClick={() => setIsOpen(false)} className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3">
            <i className="mr-2 ri-tv-2-fill"></i>TV Shows
          </Link>
          <Link to='/people' onClick={() => setIsOpen(false)} className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3">
            <i className="mr-2 ri-team-fill"></i>People
          </Link>
        </nav>

        <hr className='my-4 border-none h-[1px] bg-zinc-400' />

        <nav className='flex flex-col text-zinc-400 text-xl gap-3'>
          <h1 className='text-white font-semibold text-xl mb-3'>Website Information</h1>
          <Link to='/about' onClick={() => setIsOpen(false)} className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3">
            <i className="mr-2 ri-information-fill"></i>About Us
          </Link>
          <Link to='/contact' onClick={() => setIsOpen(false)} className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3">
            <i className="mr-2 ri-contacts-fill"></i>Contact Us
          </Link>
        </nav>
      </div>
    </>
  );
}

export default Sidenav;
