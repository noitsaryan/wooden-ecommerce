import React, { useEffect, useState } from 'react';
import OrderStepper from './OrderStepper';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import axios from 'axios';
import { storage } from '@/appwrite/appwrite.config';

const OrderCard = ({ sku, price, quantity, status, payment, totalPrice }) => {
  const [response, setResponse] = useState();
  const [image, setImage] = useState();

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

  const getFilePreviews = () => {
    // Make sure response is not null and has the images array
    if (response && response.images && response.images.length > 0) {
      const fileId = response.images[0];
      const imageLink = storage.getFilePreview('655a5d3abb5e5f5b80cc', fileId);
      setImage(imageLink.href);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [sku]);

  useEffect(() => {
    getFilePreviews();
  }, [response]);

  return (
    <section className='w-full space-y-2 border rounded-md p-3 shadow mt-3 overflow-hidden'>
      <div className='flex items-center justify-between font-medium text-sm'>
        <h2>Order Id: #{sku}</h2>
        <h2>Payment ID: {payment.payment_id}</h2>
      </div>
      <hr />
      <div className='flex gap-3'>
        <Image src={image} width={500} height={500} alt='product_ordered_img' className='w-44 bg-slate-100' />
        <div className='flex flex-col'>
          <p className='md:w-full w-40 overflow-hidden truncate font-semibold'>{response?.title}</p>
          <h3 className='text-sm'> Quantity: {quantity} </h3>
          <h2 className='text-sm'>MRP: Rs.{price}</h2>
          <h3 className='font-semibold'>Total: Rs.{totalPrice}</h3>
          <span className='space-x-2 mt-2'>
            <Button size='sm' className='bg-Primary'>
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
