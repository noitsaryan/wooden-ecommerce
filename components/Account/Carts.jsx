'use client'
import React, { useEffect, useState } from 'react'
import CartCard from './CartCard'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { RiBook2Line, RiShoppingBag3Line } from 'react-icons/ri'
import { Button } from '@nextui-org/react'
import Link from 'next/link'

const Carts = () => {
  const [response, setResponse] = useState()
  const { data: session } = useSession()

  const fetchUser = async () => {
    const res = await axios.post('/api/get-user-by-id', {
      user: session?.user?.email,
      order: false
    })
    setResponse(res.data && res.data.res?.cart)
  }

  useEffect(() => {
    fetchUser()
  }, [session])

  if ( response && response.length === 0) {
    return <div className='w-full md:h-screen  h-[50vh] flex items-center justify-center flex-col gap-2'>
    <RiShoppingBag3Line className='text-8xl text-Primary'/>
    <span className='flex items-center justify-center flex-col gap-1'>
      <h2 className='font-light text-2xl'>Your shopping cart is empty!</h2>
      <Button className='bg-Primary text-white'><Link href="/shop">SHOP NOW</Link></Button>
    </span>
  </div>
  }
  return (
    <section>
      <h2>Cart Details</h2>
      {
        response && response.map((e, i) => {
          return <CartCard  key={i} sku={e.sku} id={e._id}  />
        })
      }
    </section>
  )
}

export default Carts