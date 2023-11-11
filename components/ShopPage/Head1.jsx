'use client'
import { usePathname } from 'next/navigation'
import React from 'react'

const Head1 = () => {
    const path=usePathname()
  return (
    <h2 className='font-bold text-3xl text-center'>{
        path=="/shop" ? "SHOP" : path=="/shop/residence" ? "RESIDENCE" : path=="/shop/commercial" ? "COMMERCIAL" : path=="/shop/studios" ? "STUDIOS": path=="/shop/lighting" ? "LIGHTING" :null
    } <p className='text-sm font-medium'>Your One-Stop Shop for All Your Needs</p></h2>
  )
}

export default Head1