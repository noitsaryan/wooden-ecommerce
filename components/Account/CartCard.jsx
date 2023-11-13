import React, { useEffect, useState } from 'react'
import { Button } from '@nextui-org/react'
import Image from 'next/image'
import axios from 'axios'
import { storage } from '@/appwrite/appwrite.config'
import Checkout from '../buttons/Checkout'
import { useToast } from '../ui/use-toast'

const CartCard = ({ sku, id }) => {
  const [response, setResponse] = useState();
  const [image, setImage] = useState('');
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
        getFilePreview(res.data.images[0]);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    } else {
      return;
    }
  };

  const getFilePreview = async (imageId) => {
    try {
      const imageLink = storage.getFilePreview('65477266d57cd5b74b8c', imageId);
      const link = imageLink.href.replace('/preview?', '/view?')
      setImage(link);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
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
          src={image || "/"}
          priority
          width={500}
          height={500}
          alt='product_ordered_img'
          className='w-44 bg-slate-100'
        />
        <div className='flex flex-col'>
          <p className='md:w-full w-40 overflow-hidden truncate font-semibold'> </p>
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
              <Button onClick={remove} size='sm' variant='bordered' className='border border-Primary'>
                Remove
              </Button>
            </div>
            <Button className="border flex w-36 justify-around  rounded-md select-none bg-transparent my-3">
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