'use client'
import { Button } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const SearchProduct = ({searchItem, response, position}) => {
  return (
    <div className={`w-96 ${position} rounded max-h-80 border overflow-y-scroll gap-3 flex-col bg-slate-50 fixed top-16 z-20 p-2 ${searchItem ? "flex" : "hidden"}`}>
   {
    response.length>0 ? response && response.map((elem ,i)=>(
      <div className='flex gap-3 bg-white rounded p-2 shadow' key={i}>
      <Image src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmVkfGVufDB8fDB8fHww" width={500} height={500} alt='product_ordered_img' className=' w-20 bg-slate-100'/>
      <div className='flex flex-col'><p className='w-64 overflow-hidden truncate text-sm font-semibold'>{elem.title}</p>
      <h3 className='font-light'>Rs.{elem.price}</h3>
      <Link href={`/shop/category/${elem.sku}`}><Button size='sm' className='bg-Primary text-white'>View Product</Button></Link>

      </div>
 
     
  </div>
    )) : <h1 className='text-center text-xl'>No Product Found</h1>
   }
    </div>
  )
}

export default SearchProduct