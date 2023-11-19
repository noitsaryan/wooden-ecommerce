"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import BreadcrumbNav from "./BreadcrumbNav";
import { storage } from '@/appwrite/appwrite.config'; // Import storage if not already imported

const ProductSlide = ({ image, name }) => {
  const [imageNo, setImageNo] = useState(0);
  const [images, setImages] = useState([]);

  const getPreview = () => {
    const array = [];
    image.map(imageItem => {
      if (typeof imageItem === 'object' && imageItem.link) {
        array.push(imageItem.link);
      } else if (typeof imageItem === 'string') {
        const imageLink = storage.getFilePreview('65477266d57cd5b74b8c', imageItem);
        let modifiedUrl = imageLink.href.replace('/preview?', '/view?');
        array.push(modifiedUrl);
      }
    });
    setImages(array);
  };

  useEffect(() => {
    getPreview();
  }, [image]);

  console.log('Slide', image);

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
            src={images[imageNo] || "/"}
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
              setImageNo(imageNo === images.length - 1 ? 0 : imageNo + 1)
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-6 overflow-y-hidden p-2 gap-2 rounded-md my-2">
        {images.map((src, i) => (
          <Image
            width={150}
            height={150}
            alt="Product Image"
            key={i}
            className={` cursor-pointer ${i === imageNo ? "border-Primary " : "border"
              } border Primary rounded`}
            onClick={() => setImageNo(i)}
            src={src || "/"}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductSlide;
