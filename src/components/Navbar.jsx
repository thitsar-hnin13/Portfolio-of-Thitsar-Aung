import React, { useState } from 'react'
import OverlayMenu from './OverlayMenu';
import logo from '../assets/logo.jpg';
import { IoMenu } from "react-icons/io5";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  return (
    <>
      <div className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-50 transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className='flex items-center space-x-2 '>
          <img src={logo} alt="" className="w-8 h-8 rounded-full" />
          <div className='text-xl font-bold text-red-600 hidden sm:block'>T13H COMPANY</div>
        </div>
        <div className="block lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">

          <button onClick={() => setMenuOpen(true)} className=' text-blue-400 text-3xl focus:outline-none' aria-label="Open menu">
            <IoMenu />

          </button>
        </div>

        <div className="hidden lg:block">
          {/* <a href="#contact"className='bg-gradient-to-r from-pink-500 to-blue-500 text-white px-5 py-2 rounded-full font-medium shadow-lg hover:opacity-90 transition-opacity duration-300'>Contact</a> */}
        </div>
      </div>

      <OverlayMenu isOpen = {menuOpen}  onClose={() => setMenuOpen(false)}/>
    </> 
  )
}

export default Navbar