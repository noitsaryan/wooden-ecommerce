import { storage } from '@/appwrite/appwrite.config';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const SearchProduct = ({ searchItem, response, position }) => {
  const [image, setImage] = useState()
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

  const productFetch = () => {
    const array = []
    const imageArray = []
    response && response.map((e) => {
      array.push(e.images)
      const set = getFilePreview(e.images)
      imageArray.push(set)
    })
    setImage(imageArray)
  }

  useEffect(() => {
    productFetch()
  }, [response]);

  return (
    <div className={`w-96 ${position} rounded max-h-80 border overflow-y-scroll gap-3 flex-col bg-slate-50 fixed top-16 z-20 p-2 ${searchItem ? 'flex' : 'hidden'}`}>
      {response.length > 0 ? (
        response.map((elem, i) => (
          <div className='flex gap-3 z-50 bg-white rounded p-2 shadow' key={i}>
            <Image src={image[i] || "/"} width={500} height={500} alt='product_ordered_img' className=' w-20 bg-slate-100' />
            <div className='flex flex-col'>
              <p className='w-64 overflow-hidden truncate text-sm font-semibold'>{elem?.title}</p>
              <h3 className='font-light'>Rs.{parseInt(elem?.price).toLocaleString()}</h3>
              <Link href={`/shop/category/${elem?.sku}`}>
                <Button size='sm' className='bg-Primary text-white'>
                  View Product
                </Button>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <h1 className='text-center text-xl'>No Product Found</h1>
      )}
    </div>
  );
};

export default SearchProduct;
