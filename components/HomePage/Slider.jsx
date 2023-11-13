'use client'
import Image from 'next/image'
import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
function Slider() {

  const slideImg=[
    "/HeroSecTxtImg/3.jpg",
    "/HeroSecTxtImg/4.jpg",
    "/HeroSecTxtImg/2.jpg",
    "/HeroSecTxtImg/1.jpg",
    "/HeroSecTxtImg/5.jpg"
  ]
  return (
    <>
      <section className='p-2 overflow-hidden '>
        <Carousel className='max-w-8xl ' showThumbs={false} autoPlay interval={2000} showStatus={false} >
         {
          slideImg.map((elem, i)=>
            (<Image
            src={elem}
            key={i}
            width={1000}
            height={1000}
            alt='banner_image'
            className=' md:h-[90vh] object-cover'
            priority={true}
          />)
          )
         }

        </Carousel>
      </section>
    </>
  )
}

export default Slider