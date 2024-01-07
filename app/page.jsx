
import RecentViewProducts from "@/components/HomePage/RecentViewProducts";
import HeroSlider from "@/components/HomePage/Slider";
import ProductShopPage from "@/components/ProductShopPage";
import NormalButton from "@/components/buttons/NormalButton";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  // const CtgImg = [
  //   { link: "/CategoryImg/1.jpg", title: 'Residence' },
  //   { link: "/CategoryImg/3.jpg", title: 'Commercial' },
  //   { link: "/CategoryImg/2.jpg", title: 'Studios' },
  //   { link: "/CategoryImg/4.jpg", title: 'Lighting' }
  // ]

  return (
    <main className="flex flex-col">
      <HeroSlider />

      <RecentViewProducts/>
      <section className="p-2 space-y-5">
        <span>
          <h1 className="text-Dark text-2xl font-light text-center -tracking-2">
            {" "}
            LATEST PRODUCTS{" "}
          </h1>
          <h1 className="text-Dark text-sm font-light  text-center">
            {" "}
            Check out our latest products{" "}
          </h1>
        </span>
        <ProductShopPage />
      </section>

      <NormalButton
        name="Check More Products"
        link="/shop/all"
        extraClass={"mt-7"}
      />
    </main>
  );
};

export default page;
