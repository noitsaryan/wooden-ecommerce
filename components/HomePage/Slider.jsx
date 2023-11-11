'use client'
import Image from 'next/image'
import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
function Slider() {

  const slideImg=[
    "/HeroSecImg/_D0A5957.webp",
    "/HeroSecImg/714404c1-8e38-4b1b-ad85-e46c50ef7f23.webp",
    "/HeroSecImg/1P2A4525.webp",
    "/HeroSecImg/FB_IMG_1688702749578.webp",
    "/HeroSecImg/FB_IMG_1688702751912.webp"
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
            className=' h-[70vh] object-cover'
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