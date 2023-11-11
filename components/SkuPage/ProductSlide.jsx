"use client";
import Image from "next/image";
import React, { useState } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import BreadcrumbNav from "./BreadcrumbNav";

const ProductSlide = ({image, name}) => {
  const [imageNo, setImageNo] = useState(0);
  // const image = [
  //   "/testSKu/data_wooden-sofa_regina-wooden-sofa_updated_indigo-blue_updated_4-810x702 (1).webp",
  //   "/testSKu/data_A-website-fabric-shoot_Indigo-blue_1-810x702.webp",
  //   "/testSKu/data_wooden-sofa_regina-wooden-sofa_updated_indigo-blue_updated_16-810x702.webp",
  //   "/testSKu/data_wooden-sofa_regina-wooden-sofa_updated_indigo-blue_updated_15-810x702.jpg",
  //   "/testSKu/data_wooden-sofa_regina-wooden-sofa_updated_indigo-blue_updated_18-810x702 (1).jpg",
  //   "/testSKu/data_wooden-sofa_regina-wooden-sofa_updated_indigo-blue_updated_3Info-810x702.jpg"
  // ]
  return (
    <div className="flex flex-col items-center p-1 bg-white rounded-md relative  ">
      <BreadcrumbNav pName={name} />

      <div className="flex items-center justify-center relative flex-col w-full">
        <figure className="w-full object-fit overflow-hidden">
          <Image
            width={500}
            height={500}
            alt="Product_Image"
            className="w-full h-full bg-slate-100 rounded-md transition-all"
            src={image[imageNo] || "/"}
          />
        </figure>
        <div className="absolute flex items-center  w-full justify-between px-3 text-4xl text-black drop-shadow-m font-semibold">
          <RiArrowLeftSLine
            className="cursor-pointer"
            onClick={() => setImageNo(imageNo === 0 ? 0 : imageNo - 1)}
          />
          <RiArrowRightSLine
            className="cursor-pointer"
            onClick={() =>
              setImageNo(imageNo === image.length - 1 ? 0 : imageNo + 1)
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-6 overflow-y-hidden p-2 gap-2 rounded-md my-2">
        {image.map((e, i) => (
            <Image
              width={150}
              height={150}
              alt="Product Image"
              key={i}
              className={` cursor-pointer ${i == imageNo ? "border-Primary " : "border"
                } border Primary rounded`}
              onClick={() => setImageNo(i)}
              src={e}
            />
        ))}
      </div>
    </div>
  );
};

export default ProductSlide;
