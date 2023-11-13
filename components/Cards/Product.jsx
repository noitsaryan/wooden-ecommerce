import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsBoxSeam } from 'react-icons/bs'
function Product({ link, title, price, sku }) {
  let modifiedUrl = link.replace('/preview?', '/view?');
  return (
    <Link href={`/shop/category/${sku}`} className="cursor-pointer">
      <div className='bg-cover overflow-hidden bg-slate-50 border rounded-md'>
        <Image priority src={modifiedUrl || "/"} width={400} height={400} alt="productImg" className='object-fit h-auto w-auto rounded hover:scale-105 transition-all duration-300 cursor-pointer' />
      </div>
      <div className='p-1'>
        <p className='overflow-hidden truncate whitespace-nowrap text-slate-700 text-md '>{title}</p>
        <h3 className='text-lg '>₹{price}</h3>
        <p className='text-xs mt-[1px] bg-Primary flex gap-1 w-fit p-1 items-center justify-center text-white'>
          <BsBoxSeam className='text-md' />
          MADE TO ORDER</p>
      </div>
    </Link>
  )
}

export default Product