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
    if (isArrayofObjects(image)) {
      const firstImage = image[0].link || '';
      return firstImage
    }

    if (Array.isArray(image) && image.length > 0 && typeof image[0] === 'string') {
      return getModifiedUrl(image[0]);
    }

    if (typeof image === 'string') {
      return getModifiedUrl(image);
    }

    return '';
  };

  const getModifiedUrl = (image) => {
    const imageLink = storage.getFilePreview('655a5d3abb5e5f5b80cc', image);
    return imageLink.href.replace('/preview?', '/view?');
  };

  const imageSrc = getFilePreview(link) || "/";
 
  const recentProducts = (skuId) => {
    const existingItems = JSON.parse(localStorage.getItem('recentProducts')) || [];
    if (!existingItems.includes(skuId)) {
      const updatedItems = [...existingItems, skuId];
      localStorage.setItem('recentProducts', JSON.stringify(updatedItems));
    }
  };
  

  return (
    <Link href={`/shop/category/${sku}`} className="cursor-pointer" onClick={()=>recentProducts(sku)}>
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
        <p className='text-xs mt-[1px] bg-Primary flex gap-1 w-fit p-1 items-center justify-center text-white '>
          <BsBoxSeam className='' />
          MADE TO ORDER
        </p>
      </div>
    </Link>
  );
}

export default Product;
