"use client";
import Image from "next/image";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
function Slider() {
  const slideImg = [
    "/HeroSecNewImg/1.jpg",
    "/HeroSecNewImg/2.jpg",
    "/HeroSecNewImg/3.jpg",
    "/HeroSecNewImg/4.jpg",
  ];
  return (
    <>
      <section className="p-2 overflow-hidden ">
        <Carousel
          className="max-w-8xl "
          showThumbs={false}
          autoPlay
          interval={2000}
          showStatus={false}
        >
          {slideImg.map((elem, i) => (
            <Image
              src={elem}
              key={i}
              width={1000}
              height={1000}
              alt="banner_image"
              className="md:h-[85vh] object-cover object-center"
              priority={true}
            />
          ))}
        </Carousel>
      </section>
    </>
  );
}

export default Slider;
