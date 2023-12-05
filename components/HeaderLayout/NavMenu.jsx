'use client'
import React from 'react'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import {BiChevronDown} from 'react-icons/bi'
import Link from 'next/link'

function NavMenu() {
    const furnitureArray=['Bed', 'Chair', 'Dining Table', 'Center Table', 'Wardrobe', 'Mandir', 'Door', 'Main Door', 'Studio Door', 'Shoes Rack', 'Diffuser']
    return (
        <div className='flex flex-col md:flex-row items-start gap-6 text-xl md:text-base md:items-center '>
            <HoverCard>
                <HoverCardTrigger className='cursor-pointer flex items-center'>Collection <BiChevronDown/></HoverCardTrigger>
                <HoverCardContent className="flex flex-col gap-2">
                    <Link href="/shop/residence?p=1" className='hover:opacity-60 transition-all' >Residence</Link>
                    <Link href="/shop/commercial?p=1" className='hover:opacity-60 transition-all' >Commercial</Link>
                    <Link href="/shop/studio?p=1" className='hover:opacity-60 transition-all' >Studios</Link>
                    <Link href="/shop/lighting?p=1" className='hover:opacity-60 transition-all' >Lighting</Link>
                </HoverCardContent>
            </HoverCard>
            <HoverCard>
                <HoverCardTrigger className='cursor-pointer  flex items-center'>Furnitures <BiChevronDown/></HoverCardTrigger>
                <HoverCardContent className="flex flex-col gap-2">
                {
          furnitureArray.map((elem, i)=>(
            <Link href={`/shop/${elem.toLowerCase().replace(' ', '-')}?p=1`} key={i} className='cursor-pointer hover:opacity-70 transition-all'>{elem}</Link>
          ))
         }
                </HoverCardContent>
            </HoverCard>
            
            <HoverCard>
                <HoverCardTrigger className='cursor-pointer flex items-center'>Lighting <BiChevronDown/></HoverCardTrigger>
                <HoverCardContent className="flex flex-col gap-2">
                    <Link href="/" className='hover:opacity-60 transition-all' >Picture Lighting</Link>
                    <Link href="/" className='hover:opacity-60 transition-all' >COV</Link>
                    <Link href="/" className='hover:opacity-60 transition-all' >Panel Lighting</Link>
                    <Link href="/" className='hover:opacity-60 transition-all' >Decor Lighting</Link>
                </HoverCardContent>
            </HoverCard>
            <HoverCard>
                <HoverCardTrigger className='cursor-pointer flex items-center'>Services <BiChevronDown/></HoverCardTrigger>
                <HoverCardContent className="flex flex-col gap-2">
                    <Link href="/" className='hover:opacity-60 transition-all' >Interiors</Link>
                    <Link href="/" className='hover:opacity-60 transition-all' >Contractors</Link>
                    <Link href="/" className='hover:opacity-60 transition-all' >Decorators</Link>
                    <Link href="/" className='hover:opacity-60 transition-all' >Acoustics</Link>
                </HoverCardContent>
            </HoverCard>

        </div>
    )
}

export default NavMenu