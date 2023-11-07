import Product from "@/components/Cards/Product";
import HeroSlider from "@/components/HomePage/Slider";
import NormalButton from "@/components/buttons/NormalButton";
import Image from "next/image";
import React from "react";

const page = () => {

  return (
    <main className="flex flex-col">
      <HeroSlider />
      <section className='mb-8 grid grid-cols-1 md:grid-cols-3 place-items-center gap-2 px-2'>
          <Image
            src="/Sofa-Cum-Beds-Gif.gif"
            width={300}
            height={300}
            alt="banner_2"
            className="w-full"
          />
          <Image
            src="/Sofa-Cum-Beds-Gif.gif"
            width={300}
            height={300}
            alt="banner_2"
            className="w-full"
          />
          <Image
            src="/Sofa-Cum-Beds-Gif.gif"
            width={300}
            height={300}
            alt="banner_2"
            className="w-full"
          />
      </section>
      <section className="p-2 space-y-5">
        <span >
          <h1 className="text-Dark text-2xl font-bold text-center"> LATEST PRODUCTS </h1>
          <h1 className="text-Dark text-md  text-center"> Check out our latest products </h1>
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <Product />
          <Product />
          <Product />
          <Product />
        </div>
      </section>
      <section className="p-2 my-5 flex flex-col items-center  space-y-5">
        <span >
          <h1 className="text-Dark text-2xl font-bold text-center"> MORE PRODUCTS </h1>
          <h1 className="text-Dark text-md  text-center"> Browse more of our collections </h1>
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <Product />
          <Product />
          <Product />
          <Product />
        </div>
      </section>
      <NormalButton name="Check More Products" link="/shop" />
    </main>
  );
};

export default page;
