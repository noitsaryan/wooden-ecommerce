'use client'
import OrderCard from './OrderCard'
import { RiBook2Line } from 'react-icons/ri'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'

const Orders = () => {
  const [order, setOrder] = useState()
  const { data: session } = useSession()

  const fetchOrder = async () => {
    const order = await axios.post("/api/get-users-order", {
      email: session?.user.email,
      index: 0, 
      quantity: 10
    })
    console.log()
    setOrder(order.data.data)
  }

  useEffect(() => {
    fetchOrder();
  }, [session])


  if (!order) return <div className='w-full md:h-screen  h-[50vh] flex items-center justify-center flex-col gap-2'>
    <RiBook2Line className='text-8xl text-Primary' />
    <span className='flex items-center justify-center flex-col gap-1'>
      <h2 className='font-light text-2xl'>You have no Orders!</h2>
      <p>There are no recent orders to show</p>
      <Link href="/shop" className='bg-Primary text-white'>SHOP NOW</Link>
    </span>
  </div>
  return (
    <section>
      <h2>Order Details</h2>

      {
        order && order.order_lists.map((e, i) => {
          return <OrderCard sku={e.product_sku} key={i} price={e.price} quantity={e.quantity} status={e.status} payment={e.payments} totalPrice={e.totalPrice} />
        })
      }

    </section>
  )
}

export default Orders