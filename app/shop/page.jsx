'use client'
import { storage } from '@/appwrite/appwrite.config'
import Product from '@/components/Cards/Product'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function page() {
  const [response, setResponse] = useState()
  const [images, setImages] = useState([])
  const fetchProduct = async () => {
    try {
      const res = await axios.get('/api/get-product-cards');
      setResponse(res);
      const array = []
      res.data.map((e) => { array.push(e.images)} )
      setImages(array)
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
  useEffect(() => {
    fetchProduct()
  }, [])

  return (
    <main className='p-4 space-y-5'>

      <section className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 p-2 gap-6'>
        {
          response && response.data.map((e, i) => (
            <Product key={i} sku={e.sku} title={e.title} price={e.price} link={images[i]}  />
            ))
        }
      </section>

    </main>
  )
}

export default page