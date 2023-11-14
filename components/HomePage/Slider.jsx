'use client'
import Image from 'next/image'
import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
function Slider() {

  const slideImg=[ 
    "/HeroTxtImg/2.jpg",
    "/HeroTxtImg/5.jpeg",
    "/HeroTxtImg/1.jpg",
    "/HeroTxtImg/3.jpg",
    "/HeroTxtImg/4.jpg",
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
            className=' md:h-[80vh] object-cover object-center'
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