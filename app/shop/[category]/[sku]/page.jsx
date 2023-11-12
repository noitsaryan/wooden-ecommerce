'use client'
import { storage } from '@/appwrite/appwrite.config'
import CtaButton from '@/components/SkuPage/CtaButton'
import PinCode from '@/components/SkuPage/PinCode'
import ProductAccord from '@/components/SkuPage/ProductAccord'
import ProductCustomize from '@/components/SkuPage/ProductCustomize'
import ProductData from '@/components/SkuPage/ProductData'
import ProductSlide from '@/components/SkuPage/ProductSlide'
import {Button} from "@nextui-org/react";

import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function page() {
  const { sku } = useParams()
  const [images, setImages] = useState([])
  const [response, setResponse] = useState({})
  const [value, setValue] = useState(1)


  const fetchProduct = async () => {
    try {
      const res = await axios.post('/api/get-product-id', {
        sku
      })
      setResponse(res.data)
      const imageRes = getFilePreviews(res.data.images)
      setImages(imageRes)
    } catch (error) {
      console.log(error.message)
    }
  }
  const getFilePreviews = (imgArray) => {
    const imageLinks = imgArray.map(image_id => {
      const imageLink = storage.getFilePreview('65477266d57cd5b74b8c', image_id);
      let modifiedUrl = imageLink.href.replace('/preview?', '/view?');
      return modifiedUrl;
    });
    return imageLinks;
  };

  useEffect(() => {
    fetchProduct()
  }, [])
  return (
    <>
      <main className='p-2 flex flex-col items-center justify-center'>
        <section className='grid grid-cols-1 md:grid-cols-2  w-full gap-5 p-3 md:max-w-screen-xl'>
          <section>
            <ProductSlide name={response.title} image={images} />
          </section>
          <section className='md:pt-8'>
            <ProductData title={response.title} price={response.price} description={response.description} specification={response.specification} />
            <ProductCustomize isTrue={response.variation?.size && response.variation?.size.price > 1 ? true : false} />
            <div className="flex-col md:flex-row flex items-center font-semibold m-4 gap-2">
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
            <CtaButton amount={ value * response.price } price={response.price} totalPrice={response.price * value}  sku={response.sku} quantity={value} />
            <ProductAccord maintenance={response.maintenance} warranty={response.warranty} />
          </section>
        </section>
      </main>
    </>
  )
}

export default page