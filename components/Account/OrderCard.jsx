'use client'
import React, { useEffect, useState } from 'react';
import OrderStepper from './OrderStepper';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import axios from 'axios';
import { storage } from '@/appwrite/appwrite.config';

const OrderCard = ({ sku, price, quantity, status, payment, totalPrice }) => {
  const [response, setResponse] = useState([]);
  // const [image, setImage] = useState();

  const fetchProduct = async () => {
    try {
      const res = await axios.post('/api/get-product-id', {
        sku
      });
      setResponse(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };


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

  useEffect(() => {
    fetchProduct();
  }, [sku]);


  return (
    <section className='w-full space-y-2 border rounded-md p-3 shadow mt-3 overflow-hidden'>
      <div className='flex items-center justify-between font-medium text-sm'>
        <h2>Order Id: #{sku}</h2>
        <h2>Payment ID: {payment.payment_id}</h2>
      </div>
      <hr />
      <div className='flex  gap-3'>
        <Image  src={response && getFilePreview(response.images) || "/"} width={300} height={300} alt='product_ordered_img' className='w-32 md:w-44 bg-slate-100' />
        <div className=''>
          <p className='md:w-full w-40 overflow-hidden truncate font-semibold'>{response?.title}</p>
          <h3 className='text-sm'> Quantity: {quantity} </h3>
          <br />
          <h2 className='text-md font-semibold'>MRP: Rs.{ price }</h2>
          <span className='space-x-2 mt-2'>
            <Button size='sm' className='bg-Primary text-white'>
              Track
            </Button>
          </span>
        </div>
      </div>
      <div>
        <hr className='mt-5' />
        {status &&
          status.state.map((e, i) => {
            return <OrderStepper key={i} state={e.stage} message={e.message} />;
          })}
      </div>
    </section>
  );
};

export default OrderCard;
