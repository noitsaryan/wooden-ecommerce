import React, { useEffect, useState } from 'react'
import OrderCard from './OrderCard'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { RiBook2Line } from 'react-icons/ri'
import { Button } from '@nextui-org/react'
import Link from 'next/link'

const Orders = () => {
  const [response, setResponse] = useState()
  const {data:session} = useSession()
  const fetchUser = async () => {
    const res = await axios.post('/api/get-user-by-id', {
      user: session?.user?.email,
      order: true
    })

    setResponse(res.data.res?.order)
  }

  useEffect(() => {
    fetchUser()
  }, [session])

  if (!response) {
    return  <div className='w-full md:h-screen  h-[50vh] flex items-center justify-center flex-col gap-2'>
      <RiBook2Line className='text-8xl text-Primary'/>
      <span className='flex items-center justify-center flex-col gap-1'>
        <h2 className='font-light text-2xl'>You have no Orders!</h2>
        <p>There are no recent orders to show</p>
        <Button className='bg-Primary text-white'><Link href="/shop">SHOP NOW</Link></Button>
      </span>
    </div>
  }
  return (
    <section>
      <h2>Order Details</h2>
      
      {
        response && response.order_lists.map((e,i) => {
          return <OrderCard sku={e.product_sku} key={i} price={e.price} quantity={e.quantity} status={e.status} payment={e.payments} totalPrice={e.totalPrice} />
        })
      }
      
    </section>
  )
}

export default Orders