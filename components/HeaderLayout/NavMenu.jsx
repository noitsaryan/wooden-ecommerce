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
    return (
        <div className='space-x-8 flex items-center'>
            <HoverCard>
                <HoverCardTrigger className='cursor-pointer flex items-center'>Collection <BiChevronDown/></HoverCardTrigger>
                <HoverCardContent className="flex flex-col gap-2">
                    <Link href="/" className='hover:opacity-60 transition-all' >Residence</Link>
                    <Link href="/" className='hover:opacity-60 transition-all' >Commercial</Link>
                    <Link href="/" className='hover:opacity-60 transition-all' >Studios</Link>
                    <Link href="/" className='hover:opacity-60 transition-all' >Lighting</Link>
                </HoverCardContent>
            </HoverCard>
            <HoverCard>
                <HoverCardTrigger className='cursor-pointer  flex items-center'>Furnitures <BiChevronDown/></HoverCardTrigger>
                <HoverCardContent className="flex flex-col gap-2">
                    <Link href="/" className='hover:opacity-60 transition-all' >Bed</Link>
                    <Link href="/" className='hover:opacity-60 transition-all' >Cupboard</Link>
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
            <Link href="/"> Project </Link>

        </div>
    )
}

export default NavMenu