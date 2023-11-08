'use client'
import React from 'react'
import {Button} from "@nextui-org/react";

const CtaButton = () => {
    const style=""
  return (
    <div className='grid grid-cols-2 gap-3 px-4'>
     
  <Button color="primary" variant="bordered" className=" h-12 rounded-md border border-Primary">
        Add to cart
      </Button>
      <Button className="bg-Primary h-12 rounded-md border border-Primary" >
    Buy now
  </Button> 
    </div>
  )
}

export default CtaButton