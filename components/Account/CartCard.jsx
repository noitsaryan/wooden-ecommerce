import React from 'react'
import { Button } from '@nextui-org/react'
import Image from 'next/image'

const CartCard = () => {
  return (
    <section className='w-full space-y-2 border rounded-md p-3 shadow mt-3 overflow-hidden'>
    <div className=' flex items-center justify-between font-medium  text-sm'><h2>Product Id: #ADF325</h2> </div>
    <hr />
    <div className='flex gap-3'>
        <Image src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmVkfGVufDB8fDB8fHww" width={500} height={500} alt='product_ordered_img' className=' w-44 bg-slate-100'/>
        <div className='flex flex-col'><p className='md:w-full w-40 overflow-hidden truncate font-semibold'>Walken Sheesham Wood Bed with Full Drawer Storage</p>
        <h3 className='font-semibold'>Total: Rs.28,000</h3>
        <span className='space-x-2 mt-2'><Button size='sm' className='bg-Primary'>Checkout</Button><Button size='sm' variant='bordered' className=' border border-Primary'>Remove</Button></span>
        </div>
   
       
    </div>
</section>
  )
}

export default CartCard