'use client'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { HiOutlineMenuAlt3 } from 'react-icons/hi'
import { Input } from "@/components/ui/input"
import Link from 'next/link';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

export function Search() {
  const session = useSession()
  const route = useRouter()
  return (
    <>
      <div className="hidden sm:flex w-full max-w-sm items-center space-x-2">
        <Input type="search" placeholder="Search Products" />
        <span className='py-1 px-[5px] hover:bg-Dark/30 transition-all cursor-pointer  rounded-full bg-Dark'>
          <SearchRoundedIcon className='text-white' />
        </span>
      </div>
      <div className='flex items-center gap-4'>
        <Dialog>
          <DialogTrigger>
            <SearchRoundedIcon className='cursor-pointer sm:hidden' />
          </DialogTrigger>
          <DialogContent>
            <h1 className='text-md font-medium'> Search Products </h1>
            <Input type="search" placeholder="Search" />
          </DialogContent>
        </Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger><HiOutlineMenuAlt3 className='text-2xl cursor-pointer sm:hidden' /></DropdownMenuTrigger>
          {
            session.status === 'authenticated' ? <DropdownMenuContent className="absolute -right-2">
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => route.push('/dashboard')} >Account</DropdownMenuItem>
              <DropdownMenuItem onClick={() => route.push('/orders')} >Orders</DropdownMenuItem>
              <DropdownMenuItem onClick={() => route.push('/cart')} >Cart</DropdownMenuItem>
              <Button variant="outline" className="w-full" onClick={() => signOut()}>Logout</Button>
            </DropdownMenuContent>
              : <DropdownMenuContent className="absolute -right-2">
                <DropdownMenuLabel>Sign Up</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Already a user?</DropdownMenuItem>
                <Button variant="outline" onClick={() => route.push('/login')} className="w-full">
                  Login
                </Button>
              </DropdownMenuContent>
          }
        </DropdownMenu>

      </div>
      <div className='space-x-4 sm:flex hidden'>

        <HoverCard>
          <HoverCardTrigger href="/dashboard">
            <PersonOutlinedIcon className='text-3xl hover:text-Dark/40 cursor-pointer transition-all text-Dark' />
          </HoverCardTrigger>
          <HoverCardContent className="absolute right-0 w-44"  >
            {
              session.status === 'authenticated' ?
                <div className='space-y-2 flex flex-col justify-center'>
                  <h1 className='font-semibold text-Dark'> My Account </h1>
                  <hr />
                  <Link href="/dashboard" className='hover:bg-slate-100 transition-all pl-1 rounded-lg pr-3 py-1' >Account</Link>
                  <Link href="/order" className='hover:bg-slate-100 transition-all pl-1 rounded-lg pr-3 py-1' >Orders</Link>
                  <Link href="/cart" className='hover:bg-slate-100 transition-all pl-1 rounded-lg pr-3 py-1' >Cart</Link>
                  <Button variant="destructive" onClick={() => signOut()}>Logout</Button>
                </div> :
                <div className='space-y-2 flex flex-col justify-center'>
                  <h1 className='font-semibold text-Dark'> Sign Up </h1>
                  <hr />
                  <Link href="/dashboard" className='text-Dark/50 transition-all pl-1 rounded-lg pr-3 py-1' >Already a user?</Link>
                  <Button variant="outline" onClick={() => route.push('/login')}>Login</Button>
                </div>
            }
          </HoverCardContent>
        </HoverCard>
        <Link href='/cart'>
          <ShoppingCartOutlinedIcon className='text-3xl hover:text-Dark/40 cursor-pointer transition-all text-Dark' />
        </Link>
      </div>
    </>
  )
}