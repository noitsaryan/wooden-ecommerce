import HeroSlider from "@/components/HomePage/Slider";
import ProductShopPage from "@/components/ProductShopPage";
import NormalButton from "@/components/buttons/NormalButton";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  const CtgImg = [
    { link: "/CategoryImg/1.jpg", title: 'Residence' },
    { link: "/CategoryImg/3.jpg", title: 'Commercial' },
    { link: "/CategoryImg/2.jpg", title: 'Studios' },
    { link: "/CategoryImg/4.jpg", title: 'Lighting' }
  ]

  return (
    <main className="flex flex-col">
      <HeroSlider />

      <h2 className="text-Dark text-2xl font-light text-center -tracking-2 uppercase mt-6">SHOP By Category</h2>
      <section className='mb-8 grid md:mx-8 grid-cols-2 md:grid-cols-4 place-items-center gap-4 px-2 mt-4'>
        {
          CtgImg.map((elem, i) => (
            <Link href={`/shop/${elem.title.toLocaleLowerCase()}`} className="md:w-full" key={i}>
              <Image
                src={elem.link}
                width={300}
                height={300}
                alt="banner_2"
                className="object-cover  hover:shadow-lg  transition-all w-full md:max-h-[50vh] hover:-translate-y-2 cursor-pointer overflow-hidden"
              />
              <h2 className="font-light text-2xl drop-shadow-md text-center ">{elem.title}</h2>
            </Link>

          ))
        }
      </section>
      <section className="p-2 space-y-5">
        <span >
          <h1 className="text-Dark text-2xl font-light text-center -tracking-2"> LATEST PRODUCTS </h1>
          <h1 className="text-Dark text-sm font-light  text-center"> Check out our latest products </h1>
        </span>
        <ProductShopPage />
      </section>

      <NormalButton name="Check More Products" link="/shop" extraClass={"mt-7"} />

    </main>
  );
};

export default page;