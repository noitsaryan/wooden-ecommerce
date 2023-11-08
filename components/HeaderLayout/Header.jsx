import React from 'react'
import { Search } from '../buttons/Search'
import Link from 'next/link';
import Subcategory from './Subcategory';
import Bottomnav from './Bottomnav';


function Header() {
  return (
    <header className='py-3 px-8 space-y-4'>
      <nav className='flex items-center justify-between'>
        <div>
          <Link href="/">
            <h1 className='text-Dark text-2xl font-bold'> WinHome </h1>
          </Link>
        </div>
        <div className='flex items-center justify-center gap-8'>
          <Search />
        </div>
      </nav>
      <div className='w-full flex items-center justify-center  '>
       <Subcategory/>
      </div>
      <hr />
     <Bottomnav/>
    </header>
  )
}

export default Header