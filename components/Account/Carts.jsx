import React, { useEffect, useState } from 'react'
import CartCard from './CartCard'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { updateUser } from '@/utils/lib/users'


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

  const removeCart = async (id) => {
    try {
      // Filter out the item with the specified _id
      const updatedCart = response.filter((item) => item._id !== id);
  
      // Validate that each item in the updatedCart array has a valid sku
      const isCartValid = updatedCart.every((item) => item.sku);
  
      if (!isCartValid) {
        console.error("Invalid cart item: All items must have a valid 'sku'");
        return;
      }
  
      // Update the user with the new cart array
      const res = await updateUser(session?.user?.email, { cart: updatedCart }, 'cart', 'array');
    } catch (error) {
      console.error(error);
    }
  };

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
          return <CartCard  key={i} sku={e.sku} id={e._id} removeCart={removeCart} />
        })
      }
    </section>
  )
}

export default Carts