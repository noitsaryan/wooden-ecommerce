'use client'
import React from 'react'
import {Button} from "@nextui-org/react";
import Checkout from '../buttons/Checkout';

const CtaButton = ({amount, price, totalPrice, sku}) => {
    const style=""
  return (
    <div className='grid grid-cols-2 gap-3 px-4'>
     
  <Button  color="primary" variant="bordered" className=" h-12 rounded-md border border-Primary">
        Add to cart
      </Button>
     <Checkout amount={amount} price={price} totalPrice={totalPrice} sku={sku} />
    </div>
  )
}

export default CtaButton