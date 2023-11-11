'use client'
import BuyNow from '@/components/buttons/BuyNow'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { Input } from "@nextui-org/react";
import axios from 'axios';

function page() {
  const params = useSearchParams()
  const amount = params.get('amount')
  const order_id = params.get('order_id')
  const quantity = params.get('quantity')
  const price = params.get('price')
  const totalPrice = params.get('totalPrice')
  const user_id = params.get('user_id')
  const email = params.get('email')
  const product_sku = params.get('product_sku')
  const getProductSku = async () => {
    const sku = params.get('product_sku')
    console.log(sku)
    const res = await axios.post('/api/get-product-id', {
      sku
    })
    console.log(res)
  }
  useEffect(() => {
    getProductSku()
  }, [])

  return (
    <main className='h-screen w-screen bg-slate-300 flex'>
      <section className='w-2/3 h-fulll bg-red-200 p-4'>
        <Input type="email" variant="bordered" label="Email" />
        <Input type="email" variant="bordered" label="Email" />
        <Input type="email" variant="bordered" label="Email" />
        <Input type="email" variant="bordered" label="Email" />
        <Input type="email" variant="bordered" label="Email" />


        <BuyNow amount={amount}
          order_id={order_id}
          product_sku={product_sku}
          quantity={quantity}
          price={price}
          totalPrice={totalPrice}
          user_id={user_id}
          email={email}
        />
      </section>
      <section className='w-1/3 h-full bg-blue-200'>

      </section>

    </main>
  );
}

export default page;
