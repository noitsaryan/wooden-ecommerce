'use client'
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import { signOut } from 'next-auth/react';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { FiBox, FiChevronRight, FiHome, FiLock, FiLogOut, FiShoppingBag, FiUser } from "react-icons/fi";



export default function RootLayout({ children }) {
    const {toast} = useToast();
    const location = usePathname('/account')
    return (
        <main className='w-full bg-slate-50 flex items-start justify-center gap-3 md:p-10 relative flex-col md:flex-row'>
            <section className='h-full w-96 bg-white shadow-md rounded-md flex-col items-stretch md:p-4 gap-3 hidden md:flex'>
                <div><h2 className='font-semibold text-2xl'>My Account</h2></div>
                <Link href="/account/orders" className={`h-20 ${location == '/account/orders' ? 'bg-slate-100' : 'bg-white'} border-transparent border-l-4 hover:border-Primary transition-all hover:bg-slate-100 rounded-sm shadow flex items-center justify-between px-2`}><span className='flex items-center justify-center gap-2'><FiBox className='text-3xl text-Primary' />Orders</span><FiChevronRight /></Link>
                <Link href="/account/carts" className={`h-20 ${location == '/account/carts' ? 'bg-slate-100' : 'bg-white'} border-transparent border-l-4 hover:border-Primary transition-all hover:bg-slate-100 rounded-sm shadow flex items-center justify-between px-2`}><span className='flex items-center justify-center gap-2'><FiShoppingBag className='text-3xl text-Primary' />Carts</span><FiChevronRight /></Link>
                <Link href="/account/address" className={`h-20  ${location == '/account/address' ? 'bg-slate-100' : 'bg-white'} border-transparent border-l-4 hover:border-Primary transition-all hover:bg-slate-100 rounded-sm shadow flex items-center justify-between px-2`}><span className='flex items-center justify-center gap-2'><FiHome className='text-3xl text-Primary' />Address</span><FiChevronRight /></Link>
                <Link href="/account/userdata" className={`h-20 ${location == '/account/personaldata' ? 'bg-slate-100' : 'bg-white'} border-transparent border-l-4 hover:border-Primary transition-all hover:bg-slate-100 rounded-sm shadow flex items-center justify-between px-2`}><span className='flex items-center justify-center gap-2'><FiUser className='text-3xl text-Primary' />Personal Data</span><FiChevronRight /></Link>
                <Link href="/account/new-password" className={`h-20 ${location == '/account/password' ? 'bg-slate-100' : 'bg-white'} border-transparent border-l-4 hover:border-Primary transition-all hover:bg-slate-100 rounded-sm shadow flex items-center justify-between px-2`}><span className='flex items-center justify-center gap-2'><FiLock className='text-3xl text-Primary' />Password</span><FiChevronRight /></Link>
                <button onClick={() => {
                    axios.get("/api/logout").then((res) => {
                        console.log(res)
                        if (res.data.success) {
                            toast({
                                title: 'Logged out successfully'
                            })
                        }
                    })
                }} className={`h-20 ${location == '/account/signout' ? 'bg-slate-100' : 'bg-white'} border-transparent border-l-4 hover:border-Primary transition-all hover:bg-slate-100 rounded-sm shadow flex items-center justify-between px-2`}><span className='flex items-center justify-center gap-2'><FiLogOut className='text-3xl text-Primary' />Sign Out</span><FiChevronRight /></button>


            </section>
            <section className='w-full h-32 bg-white shadow-md mt-2 md:hidden'>
                <h2 className='font-semibold text-2xl m-3 text-center'>My Account</h2>
                <div className=' w-full grid grid-cols-6'  >
                    <Link href="/account/orders" className='text-3xl text-Primary p-1 rounded hover:bg-slate-100 flex justify-center flex-col items-center'><FiBox /> <p className='text-sm'>orders</p></Link>
                    <Link href="/account/carts" className='text-3xl text-Primary p-1 rounded hover:bg-slate-100 flex justify-center flex-col items-center'>< FiShoppingBag /><p className='text-sm'>cart</p></Link>
                    <Link href="/account/address" className='text-3xl text-Primary p-1 rounded hover:bg-slate-100 flex justify-center flex-col items-center'>< FiHome /><p className='text-sm'>address</p></Link>
                    <Link href="/account/userdata" className='text-3xl text-Primary p-1 rounded hover:bg-slate-100 flex justify-center flex-col items-center'>< FiUser /><p className='text-sm'>User</p></Link>
                    <Link href="/account/new-password" className='text-3xl text-Primary p-1 rounded hover:bg-slate-100 flex justify-center flex-col items-center'>< FiLock /><p className='text-sm'>password</p></Link>
                    <button onClick={() => {
                    axios.get("/api/logout").then((res) => {
                        console.log(res)
                        if (res.data.success) {
                            toast({
                                title: 'Logged out successfully'
                            })
                        }
                    })
                }} className='text-3xl text-Primary p-1 rounded hover:bg-slate-100 flex justify-center flex-col items-center'><FiLogOut /><p className='text-sm' >logout</p></button>

                </div>
            </section>
            <section className=' w-full md:flex-1 bg-white rounded-md p-3 max-h-screen overflow-y-scroll '>
                {children}
            </section>
        </main>
    );
}