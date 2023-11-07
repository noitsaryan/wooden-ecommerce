import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {BsBoxSeam} from 'react-icons/bs'
function Product() {
  return (
    <Link href="/" className="cursor-pointer">
      <div className='bg-cover overflow-hidden'>
        <Image src="/testProduct.jpg" width={400} height={400} alt="productImg" className='object-fit rounded hover:scale-105 transition-all duration-300 cursor-pointer' />
      </div>
     <div className='p-1'>
     <p className='overflow-hidden truncate whitespace-nowrap text-slate-700 text-md '>Osbert 3 Seater Curved Sofa with Brass Cladding (Cotton, Jade Ivory)</p>
      <h3 className='text-lg '>₹49,989</h3>
      <div className='flex items-center gap-[3px]'>
        <BsBoxSeam className='text-md' />
        <p className='text-sm mt-[1px]'>MADE TO ORDER</p>
      </div>
     </div>
    </Link>
  )
}

export default Product