'use client'
import { usePathname } from 'next/navigation';
import React from 'react';

const Head1 = () => {
  const path = usePathname();

  const getCategoryDescription = () => {
    if (path === "/shop") {
      return "Your One-Stop Shop for All Your Needs";
    } else if (path === "/shop/residence") {
      return "Discover a wide range of products for residential spaces";
    } else if (path === "/shop/commercial") {
      return "Find the perfect solutions for your commercial projects";
    } else if (path === "/shop/studios") {
      return "Explore products specifically designed for studios";
    } else if (path === "/shop/lighting") {
      return "Illuminate your space with our high-quality lighting options";
    } else {
      return "";
    }
  };

  return (
    <h2 className='font-light text-3xl text-center'>
      {path === "/shop"
        ? "SHOP"
        : path === "/shop/residence"
        ? "RESIDENCE"
        : path === "/shop/commercial"
        ? "COMMERCIAL"
        : path === "/shop/studios"
        ? "STUDIOS"
        : path === "/shop/lighting"
        ? "LIGHTING"
        : null}
      <p className='text-sm font-light'>{getCategoryDescription()}</p>
    </h2>
  );
};

export default Head1;