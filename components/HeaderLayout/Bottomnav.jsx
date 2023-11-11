'use client'
import React from 'react'
import { RiHome4Fill, RiHome4Line, RiListCheck, RiListUnordered, RiShoppingCart2Fill, RiShoppingCart2Line, RiUser3Fill, RiUser3Line } from 'react-icons/ri';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Bottomnav = () => {
  const location=usePathname()
    
  return (
    <div className="md:hidden fixed -bottom-1 right-0 left-0 h-auto bg-white shadow-lg z-10 flex items-center justify-around text-2xl text-black">
    <Link href="/" className="flex flex-col items-center justify-center p-2">{location=="/" ? <RiHome4Fill/> : <RiHome4Line/>}<p className="text-sm">Home</p></Link>
    <Link href="/shop" className="flex flex-col items-center justify-center p-2">{location=="/shop" ?<RiListCheck/>: <RiListUnordered/> }<p className="text-sm">Category</p></Link>
    <Link href="/account/carts"className="flex flex-col items-center justify-center p-2">{location=="/account/carts" ? <RiShoppingCart2Fill/> :<RiShoppingCart2Line/> }<p className="text-sm">Cart</p></Link>
    <Link href="/account" className="flex flex-col items-center justify-center p-2">{location=="/account" ? <RiUser3Fill/>: <RiUser3Line/>}<p className="text-sm">Account</p></Link>
  </div>
  )
}

export default Bottomnav