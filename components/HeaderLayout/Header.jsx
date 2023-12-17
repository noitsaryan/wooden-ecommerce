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

  const furnitureArray=['Bed', 'Chair', 'Dining Table', 'Center Table', 'Wardrobe', 'Mandir', 'Door', 'Main Door', 'Studio Door', 'Shoes Rack', 'Diffuser']
  


  return (
    <header className={`py-3  px-8 z-50 ${isSticky ? 'fixed top-0 left-0 right-0 bg-white shadow-md' : ''}`}>
      <nav className='flex items-center justify-between gap-5'>
       

          <Link href="/">
          <Image src="/LOGO/ashofy_logo.jpg" width={900} height={900} alt='LOGO' className='md:w-56 w-44'/>
          </Link>
        <span className='md:flex hidden'><NavMenu/></span>
        <div className='flex items-center justify-center gap-8'>
          <Search />
        </div>
        {
          navDisplay ? 
        <RiCloseLine className='text-3xl md:hidden flex' onClick={()=>setNavDisplay(!navDisplay)}/>
        :<RiMenu3Fill className='text-3xl md:hidden flex' onClick={()=>setNavDisplay(!navDisplay)}/>
        }
      </nav>
      {/* For Phone responsiveness  */}
       <div className={`animate__animated animate__fadeInLeft md:hidden  bg-white ${navDisplay ? "visible" : "hidden"} pt-4`}>
       <Accordion variant="light">
      <AccordionItem key="1" aria-label="Accordion 1" title="Collection">
        
         <div  className='flex flex-col gap-2 text-lg font-light' >
         <Link href="/shop/residence?p=1" className='cursor-pointer hover:opacity-70 transition-all'>Residence</Link>
          <Link href="/shop/commercial?p=1" className='cursor-pointer hover:opacity-70 transition-all'>Commercial</Link>
          <Link href="/shop/lighting?p=1" className='cursor-pointer hover:opacity-70 transition-all'>Lighting</Link>
          <Link href="/shop/studio?p=1" className='cursor-pointer hover:opacity-70 transition-all'>Studios</Link>
         </div>
        
      </AccordionItem>
      <AccordionItem key="2" aria-label="Accordion 2" title="Furnitures ">
      <div  className='flex flex-col gap-2 text-lg font-light' >
         {
          furnitureArray.map((elem, i)=>(
            <Link href={`/shop/${elem.replace(/ /g, '-').toLowerCase()}`} key={i} className='cursor-pointer hover:opacity-70 transition-all'>{elem}</Link>
          ))
         }

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
      <AccordionItem key="4" aria-label="Accordion 3" title="Services">
      <div  className='flex flex-col gap-2 text-lg font-light' >
         <Link href="/" className='cursor-pointer hover:opacity-70 transition-all'> Interiors </Link>
          <Link href="/" className='cursor-pointer hover:opacity-70 transition-all'>Contractors</Link>
          <Link href="/" className='cursor-pointer hover:opacity-70 transition-all'>Decorators</Link>
          <Link href="/" className='cursor-pointer hover:opacity-70 transition-all'>Acoustics</Link>
          </div>
      </AccordionItem>
     
    </Accordion>
    <br />
    
        </div> 

      <div className='w-full flex items-center justify-center'>
        {/* <Subcategory /> */}
      </div>
      <Bottomnav />
    </header>
  );
}

export default Header;
