import CtaButton from '@/components/SkuPage/CtaButton'
import PinCode from '@/components/SkuPage/PinCode'
import ProductData from '@/components/SkuPage/ProductData'
import ProductSlide from '@/components/SkuPage/ProductSlide'
import Quantity from '@/components/SkuPage/Quantity'
import React from 'react'

function page() {
  return (
    <>
    <main className='p-2 flex flex-col items-center justify-center'>
      <section className='grid grid-cols-1 md:grid-cols-2  w-full gap-5 p-3 md:max-w-screen-xl'>
        <section>
          <ProductSlide/>
        </section>
        <section className='md:pt-8'>
          <ProductData/>
          <Quantity/>
          <PinCode/>
          <CtaButton/>
        </section>
      </section>
    </main>
    </>
    )
}

export default page