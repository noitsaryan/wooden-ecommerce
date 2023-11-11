import React, { useEffect, useState } from 'react'
import OrderCard from './OrderCard'
import { useSession } from 'next-auth/react'
import axios from 'axios'

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
    return <p> No Data to display </p>
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