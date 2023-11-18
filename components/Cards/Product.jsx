import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BsBoxSeam } from 'react-icons/bs';
import { storage } from '@/appwrite/appwrite.config';

function Product({ link, title, price, sku }) {
  
  const isArrayofObjects = (value) => {
    return Array.isArray(value) && value.length > 0 && typeof value[0] === 'object';
  };

  const getFilePreview = (image) => {
    // If it's an array of objects, pick the link from the first object
    if (isArrayofObjects(image)) {
      const firstImage = image[0].link || '';
      return firstImage
    }

    // If it's an array of strings, pick the first string and pass it to the function
    if (Array.isArray(image) && image.length > 0 && typeof image[0] === 'string') {
      return getModifiedUrl(image[0]);
    }

    // If it's a single string, pass it to the function
    if (typeof image === 'string') {
      return getModifiedUrl(image);
    }

    // Return a default value or handle other cases as needed
    return '';
  };

  // Function to get the modified URL
  const getModifiedUrl = (image) => {
    const imageLink = storage.getFilePreview('65477266d57cd5b74b8c', image);
    return imageLink.href.replace('/preview?', '/view?');
  };

  const imageSrc = getFilePreview(link) || "/";

  return (
    <Link href={`/shop/category/${sku}`} className="cursor-pointer">
      <div className='bg-cover overflow-hidden bg-slate-50 border rounded-md'>
        <Image
          priority
          src={imageSrc}
          width={400}
          height={400}
          alt="productImg"
          className='object-fit h-auto w-auto rounded hover:scale-105 transition-all duration-300 cursor-pointer'
        />
      </div>
      <div className='p-1'>
        <p className='overflow-hidden truncate whitespace-nowrap text-slate-700 text-md'>{title}</p>
        <h3 className='text-lg'>₹{parseInt(price).toLocaleString()}</h3>
        <p className='text-xs mt-[1px] bg-Primary flex gap-1 w-fit p-1 items-center justify-center text-white'>
          <BsBoxSeam className='text-md' />
          MADE TO ORDER
        </p>
      </div>
    </Link>
  );
}

export default Product;
