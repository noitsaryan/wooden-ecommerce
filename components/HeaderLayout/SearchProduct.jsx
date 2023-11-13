import { storage } from '@/appwrite/appwrite.config';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const SearchProduct = ({ searchItem, response, position }) => {
  const [image, setImage] = useState([]);

  useEffect(() => {
    const array = [];
    const images = [];
    response.map((e) => array.push(e.images[0]));
    array.length > 0 &&
      array.map((e) => {
        const img = storage.getFilePreview('65477266d57cd5b74b8c', e);
        images.push(img.href.replace('/preview?', '/view?'));
      });
    setImage(images);
  }, [response]);

  useEffect(() => {
    console.log(image)
  }, [image])

  return (
    <div className={`w-96 ${position} rounded max-h-80 border overflow-y-scroll gap-3 flex-col bg-slate-50 fixed top-16 z-20 p-2 ${searchItem ? 'flex' : 'hidden'}`}>
      {response.length > 0 ? (
        response.map((elem, i) => (
          <div className='flex gap-3 z-50 bg-white rounded p-2 shadow' key={i}>
            <Image src={image[i]} width={500} height={500} alt='product_ordered_img' className=' w-20 bg-slate-100' />
            <div className='flex flex-col'>
              <p className='w-64 overflow-hidden truncate text-sm font-semibold'>{elem?.title}</p>
              <h3 className='font-light'>Rs.{elem?.price}</h3>
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
