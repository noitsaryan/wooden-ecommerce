import React, { useEffect, useState } from 'react'
import CartCard from './CartCard'
import { useSession } from 'next-auth/react'
import axios from 'axios'


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

  if (!response) {
    return <p> No Data to display </p>
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