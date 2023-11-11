'use client'
import { storage } from '@/appwrite/appwrite.config'
import Product from '@/components/Cards/Product'
import Paginate from '@/components/ShopPage/Pagination'
import RangeSlider from '@/components/ShopPage/RangeSlider'
import TabShop from '@/components/ShopPage/TabShop'
import { getPreview } from '@/utils/lib/appwrite'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function page() {
  const [response, setResponse] = useState()
  const [image, setImage] = useState([])
  const fetchProduct = async () => {
    try {
      const res = await axios.get('/api/get-product-cards');
      setResponse(res);
      const firstImage = res.data.map((e) => e.images?.[0]); // Close the parenthesis here

    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const getFilePreview =  (image_id) => {

    const imageLink = storage.getFilePreview('65477266d57cd5b74b8c', image_id);
    return imageLink.href;
  }


  useEffect(() => {
    fetchProduct()
  }, [])

  return (
    <main className='p-4 space-y-5'>
      <h2 className='font-bold text-3xl text-center'>SHOP <p className='text-sm font-medium'>Your One-Stop Shop for All Your Needs</p></h2>
      <div className='w-full flex md:justify-between  mx-auto items-center md:flex-row flex-col gap-5 justify-center'><TabShop /><RangeSlider /></div>
      <hr />
      <section className='w-full  bg-slate-50 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 p-2 gap-6'>
        {
          response && response.data.map((e, i) => (
            <Product key={i} sku={e.sku} title={e.title} price={e.price} link={getFilePreview(e.images[0])} /> 
          ))
        }
      </section>
      <span className='w-full flex items-center justify-center'>
        <Paginate />

      </span>
    </main>
  )
}

export default page