'use client'
import { storage } from '@/appwrite/appwrite.config'
import CtaButton from '@/components/SkuPage/CtaButton'
import PinCode from '@/components/SkuPage/PinCode'
import ProductAccord from '@/components/SkuPage/ProductAccord'
import ProductCustomize from '@/components/SkuPage/ProductCustomize'
import ProductData from '@/components/SkuPage/ProductData'
import ProductSlide from '@/components/SkuPage/ProductSlide'
import Product from "@/components/Cards/Product";
import { Button } from "@nextui-org/react";

import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function page() {
  const { sku } = useParams()
  const [images, setImages] = useState([])
  const [response, setResponse] = useState({})
  const [recentResponse, setRecentResponse] = useState()
  const [slideImage, setSlideImage] = useState([])
  const [value, setValue] = useState(1)


  const fetchProduct = async () => {
    try {
      const res = await axios.post('/api/get-product-id', {
        sku
      })
      setResponse(res.data)
      setSlideImage(res.data.images)
    } catch (error) {
      console.log(error.message)
    }
  }


  const getProducts = async () => {
    const res = await axios.get('/api/get-product-cards')
    setRecentResponse(res)
    const array = []
    res.data.map((e) => { array.push(e.images) })
    setImages(array)
  }

  const getProductFilePreview = (image_id) => {

    const imageLink = storage.getFilePreview('65477266d57cd5b74b8c', image_id);
    return imageLink.href;
  }
  useEffect(() => {
    fetchProduct()
    getProducts()
  }, [])
  return (
    <>
      <main className='md:p-2 flex flex-col items-center justify-center'>
        <section className='grid grid-cols-1 md:grid-cols-2  w-full gap-5 md:p-3 md:max-w-screen-xl'>
          <section>
            <ProductSlide name={response.title} image={slideImage} />
          </section>
          <section className='md:pt-8'>
            <ProductData title={response.title} price={response.price} description={response.description} specification={response.specification} />
            <ProductCustomize isTrue={response.variation?.size && response.variation?.size.price > 1 ? true : false} />
            <div className="flex-col md:flex-row flex items-center font-light m-4 gap-2">
              <p>Quantity</p>
              <Button className="border flex w-36 justify-around p-2 rounded-md select-none bg-transparent">
                <p onClick={() => setValue((prev) => prev - 1)}>-</p>
                <p> {value < 1 ? setValue(1) : value} </p>
                <p onClick={() => setValue((prev) => prev + 1)}>+</p>
              </Button>
              <p className="flex gap-1 opacity-70 text-sm md:text-md">
                Rs.
                {
                  <span className="">
                    &#x20B9;{(52000 * value).toLocaleString()}
                  </span>
                }
                <span className='text-Primary'>(incl. of all taxes)</span>
              </p>
            </div>
            <PinCode />
            <CtaButton amount={value * response.price} price={response.price} totalPrice={response.price * value} sku={response.sku} quantity={value} />
            <ProductAccord maintenance={response.maintenance} warranty={response.warranty} />
          </section>

        </section>

        <h2 className="text-Dark text-2xl font-light text-center -tracking-2 uppercase m-6">Related Products</h2>


        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {
            recentResponse && recentResponse.data.slice(1, 5).map((e, i) => {
              return <Product
                sku={e.sku}
                title={e.title}
                key={i}
                link={images[i]}
                price={e.price}
              />
            })
          }
        </section>
      </main>
    </>
  )
}

export default page