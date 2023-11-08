import Product from '@/components/Cards/Product'
import Paginate from '@/components/ShopPage/Pagination'
import RangeSlider from '@/components/ShopPage/RangeSlider'
import TabShop from '@/components/ShopPage/TabShop'
import React from 'react'

function page() {
    return (
      <main className='p-4 space-y-5'>
       <h2 className='font-bold text-3xl text-center'>SHOP <p className='text-sm font-medium'>Your One-Stop Shop for All Your Needs</p></h2>
       <div className='w-full flex md:justify-between  mx-auto items-center md:flex-row flex-col gap-5 justify-center'><TabShop/><RangeSlider/></div>
       <hr  />
       <section className='w-full  bg-slate-50 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 p-2 gap-6'>
        {
    Array(10).fill().map((_, i) => (
      <Product key={i} />
    ))
  }
       </section>
       <span className='w-full flex items-center justify-center'>
       <Paginate/>

       </span>
      </main>
    )
}

export default page