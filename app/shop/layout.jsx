'use client'
import Head1 from "@/components/ShopPage/Head1";
import Paginate from "@/components/ShopPage/Pagination";
import RangeSlider from "@/components/ShopPage/RangeSlider";
import TabShop from "@/components/ShopPage/TabShop";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function RootLayout({ children }) {
  const path = usePathname();
  const shouldHideDiv = path.split("/").length > 3; 
  // const [rangeValue, setRangeValue]=useState([])

  return (
    <main className='p-4 space-y-5'>
      <hr />
      <Head1 />
      {!shouldHideDiv && (
        <div className={`w-full flex md:justify-between mx-auto items-center md:flex-row flex-col gap-5 justify-center`}>
          <TabShop />
          {/* <RangeSlider setRangeValue={setRangeValue}/> */}
        </div>
      )}
      {children}
      <span className='w-full flex items-center justify-center'>
        {
            !shouldHideDiv && (
        <Paginate />
                
            )
        }
      </span>
    </main>
  );
}