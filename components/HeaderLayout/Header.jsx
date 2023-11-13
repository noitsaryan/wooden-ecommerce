'use client'
import React, { useState, useEffect } from 'react';
import { Search } from '../buttons/Search';
import Link from 'next/link';
import Subcategory from './Subcategory';
import Bottomnav from './Bottomnav';
import NavMenu from './NavMenu';
import { RiCloseLine, RiMenu2Line, RiMenu3Fill } from 'react-icons/ri'
import 'animate.css';
import {Accordion, AccordionItem} from "@nextui-org/react";
import Image from 'next/image';


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
       

          <Link href="/">
            <Image src="/LOGO/Pasted-20231113-142228.svg" width={500} height={500} alt='LOGO' className='w-36 md:translate-x-0 tranform -translate-x-5'/>
          </Link>
        <span className='md:flex hidden'><NavMenu/></span>
        <div className='flex items-center justify-center gap-8'>
          <Search />
        </div>
        {
          navDisplay ? 
        <RiCloseLine className='text-2xl md:hidden flex' onClick={()=>setNavDisplay(!navDisplay)}/>
        :<RiMenu3Fill className='text-2xl md:hidden flex' onClick={()=>setNavDisplay(!navDisplay)}/>
        }
      </nav>
      {/* For Phone responsiveness  */}
       <div className={`animate__animated animate__fadeInLeft md:hidden  bg-white ${navDisplay ? "visible" : "hidden"} pt-4`}>
       <Accordion variant="light">
      <AccordionItem key="1" aria-label="Accordion 1" title="Collection">
        
         <div  className='flex flex-col gap-2 text-lg font-light' >
         <Link href="/shop/residence" className='cursor-pointer hover:opacity-70 transition-all'>Residence</Link>
          <Link href="/shop/commercial" className='cursor-pointer hover:opacity-70 transition-all'>Commercial</Link>
          <Link href="/shop/lighting" className='cursor-pointer hover:opacity-70 transition-all'>Lighting</Link>
          <Link href="/shop/studios" className='cursor-pointer hover:opacity-70 transition-all'>Studios</Link>
         </div>
        
      </AccordionItem>
      <AccordionItem key="2" aria-label="Accordion 2" title="Furnitures ">
      <div  className='flex flex-col gap-2 text-lg font-light' >
         <Link href="/" className='cursor-pointer hover:opacity-70 transition-all'>Bed</Link>
          <Link href="/" className='cursor-pointer hover:opacity-70 transition-all'>Cupboard</Link>
          </div>
      </AccordionItem>
      <AccordionItem key="3" aria-label="Accordion 3" title="Lighting">
      <div  className='flex flex-col gap-2 text-lg font-light' >
         <Link href="/" className='cursor-pointer hover:opacity-70 transition-all'> Picture Lighting</Link>
          <Link href="/" className='cursor-pointer hover:opacity-70 transition-all'>COV</Link>
          <Link href="/" className='cursor-pointer hover:opacity-70 transition-all'>Panel Lighting</Link>
          <Link href="/" className='cursor-pointer hover:opacity-70 transition-all'>Decor Lighting</Link>
          </div>
      </AccordionItem>
     
    </Accordion>
    <hr />
    <br />
  <Link href="/" className='mx-2 text-xl'>Project</Link>
    
        </div> 

      <div className='w-full flex items-center justify-center'>
        {/* <Subcategory /> */}
      </div>
      <Bottomnav />
    </header>
  );
}

export default Header;
