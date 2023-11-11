'use client'
import React, { useState, useEffect } from 'react';
import { Search } from '../buttons/Search';
import Link from 'next/link';
import Subcategory from './Subcategory';
import Bottomnav from './Bottomnav';
import NavMenu from './NavMenu';
import { RiMenu2Line } from 'react-icons/ri'
import 'animate.css';


function Header() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      // Check if the scroll position is greater than a certain value (e.g., 50px)
      const scrollPosition = window.scrollY;
      setIsSticky(scrollPosition > 50);
    };

    // Attach the scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [navDisplay, setNavDisplay]=useState(false)


  return (
    <header className={`py-3  px-8 z-50 ${isSticky ? 'fixed top-0 left-0 right-0 bg-white shadow-md' : ''}`}>
      <nav className='flex items-center justify-between'>
        <div className='flex items-center justify-center gap-2'>
        <RiMenu2Line className='text-2xl md:hidden flex' onClick={()=>setNavDisplay(!navDisplay)}/>

          <Link href="/">
            <h1 className='text-Dark text-2xl font-bold'> WinHome </h1>
          </Link>
        </div>
        <span className='md:flex hidden'><NavMenu/></span>
        <div className='flex items-center justify-center gap-8'>
          <Search />
        </div>
      </nav>
       <div className={`animate__animated animate__fadeInLeft  p-2 w-screen  md:hidden flex bg-white ${navDisplay ? "flex" : "hidden"} pt-6`}>
          <NavMenu/>
        </div> 

      <div className='w-full flex items-center justify-center'>
        {/* <Subcategory /> */}
      </div>
      <Bottomnav />
    </header>
  );
}

export default Header;
