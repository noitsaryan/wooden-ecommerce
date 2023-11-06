'use client'
import BuyNow from '@/components/buttons/BuyNow'
import { useSearchParams } from 'next/navigation'
import React from 'react'

function page() {
  const params = useSearchParams()
  const amount = params.get('amount')
  const order_id = params.get('order_id')
  const product_sku = params.get('product_sku')
  const quantity = params.get('quantity')
  const price = params.get('price')
  const totalPrice = params.get('totalPrice')
  const user_id = params.get('user_id')
  const email = params.get('email')
  return (
    <main>
      <BuyNow amount={amount} order_id={order_id}
        product_sku={product_sku}
        quantity={quantity}
        price={price}
        totalPrice={totalPrice}
        user_id={user_id}
        email={email}
      />
    </main>
  )
}

export default page