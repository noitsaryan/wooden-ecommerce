'use client'
import React, { useEffect, useState } from 'react'
import CartCard from './CartCard'
import axios from 'axios'
import { RiShoppingBag3Line } from 'react-icons/ri'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { useToast } from '../ui/use-toast'

const Carts = () => {
  const [response, setResponse] = useState([])
  const {toast} = useToast()
  useEffect(() => {
    axios.get("/api/get-current-user").then((res) => {
      if(!res.data.success) {
        toast({
          title: 'User not logged in'
        })
        return;
      }
      setResponse(res.data.data.cart)
    })
  }, [])

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