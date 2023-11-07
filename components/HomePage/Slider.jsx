'use client'
import Image from 'next/image'
import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
function Slider() {
  return (
    <>
      <section className='p-2 overflow-hidden '>
        <Carousel className='max-w-8xl ' showThumbs={false} autoPlay interval={2000} showStatus={false} showArrows={false}>
          <Image
            src="/testbanner.webp"
            width={600}
            height={600}
            alt='banner_image'
            className='min-h-[30vh] object-cover'
            priority={true}
          />

        </Carousel>
      </section>
    </>
  )
}

export default Slider