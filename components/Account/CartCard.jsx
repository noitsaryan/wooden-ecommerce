import React, { useEffect, useState } from 'react'
import { Button } from '@nextui-org/react'
import Image from 'next/image'
import axios from 'axios'
import { storage } from '@/appwrite/appwrite.config'
import Checkout from '../buttons/Checkout'
import { useToast } from '../ui/use-toast'

const CartCard = ({ sku, id }) => {
  const [response, setResponse] = useState();
  const [quantity, setQuantity] = useState(1)
  const {toast} = useToast()
  const remove = async () => {
    try {
      const cart = await axios.post('/api/delete-cart', {
        sku_id: id
      });
      if(cart.data === 'Success') {
        toast({
          title: `SKU: ${sku}, removed successfully`
        })
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const fetchProduct = async () => {
    if (sku) {
      try {
        const res = await axios.post('/api/get-product-id', {
          sku,
        });
        setResponse(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    } else {
      return;
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
      <div className=' flex items-center justify-between font-medium text-sm'>
        <h2>Product Id: <span className='uppercase'>#{sku}</span></h2>
      </div>
      <hr />
      <div className='flex gap-3'>
        <Image
          src={response && getFilePreview(response.images) || "/"}
          priority
          width={500}
          height={500}
          alt='product_ordered_img'
          className='md:w-32 md:h-32 h-24 w-24 bg-slate-100'
        />
        <div className='flex flex-col'>
          <p className='md:w-full w-24 overflow-hidden truncate font-semibold'> </p>
          <h3 className='font-semibold'>{response?.title}</h3>
          <h3 className='font-semibold'>Price: Rs. {response?.price.toLocaleString()}</h3>
          <span className='space-x-2 mt-2'>
            <div className='grid grid-cols-2 gap-3 '>
              <Checkout
                amount={response?.price}
                sku={sku}
                totalPrice={response?.price * quantity}
                price={response?.price}
                key={id}
                value={quantity}
                style="max-h-8"
              />
              <Button onClick={remove} size='sm' variant='bordered' className='border border-Primary text-Primary'>
                Remove
              </Button>
            </div>
            <Button className="border flex w-36 justify-around  rounded-md select-none bg-transparent my-3 text-Primary">
              <p onClick={() => setQuantity((prev) => prev - 1)}>-</p>
              <p> {quantity < 1 ? setQuantity(1) : quantity} </p>
              <p onClick={() => setQuantity((prev) => prev + 1)}>+</p>
            </Button>
          </span>
        </div>
      </div>
    </section>
  )
}

export default CartCard