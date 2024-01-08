'use client'
import OrderCard from './OrderCard'
import { RiBook2Line } from 'react-icons/ri'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useToast } from '../ui/use-toast'

const Orders = () => {
  const [order, setOrder] = useState()
  const {toast} = useToast();
  const fetchOrder = () => {
    axios.get("/api/get-current-user").then(res => {
      if (!res.data.success) {
        toast({
          title: res.data.message
        })
        return;
      }
      axios.post("/api/get-users-order", {
        email: res.data.data.email,
        index: 0,
        quantity: 10
      }).then((res) => {
        if (!res) {
          toast({
            title: 'Order cannot be fetched at the moment'
          })
        }
        toast({
          title: 'Fetched order successfully'
        })
        setOrder(res.data.data)
      })
    })
  }

  useEffect(() => {
    fetchOrder();
  }, [])


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
export const dynamic = 'force-dynamic'