'use client'
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
import Reviews from '@/components/ShopPage/Reviews'


function page() {
  const { sku } = useParams()
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
    const res = await axios.post('/api/get-product-subcategory', {
      type: response.subCategory
    })
    setRecentResponse(res)
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  useEffect(() => {
    getProducts()
  }, [response])
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
              <Button className="border grid grid-cols-3 w-36 justify-around p-2 rounded-md select-none bg-transparent">
                <p onClick={() => setValue((prev) => prev - 1)}>-</p>
                <p> {value < 1 ? setValue(1) : value} </p>
                <p onClick={() => setValue((prev) => prev + 1)}>+</p>
              </Button>
              <p className="flex gap-1 opacity-70 text-sm md:text-md">
                Rs.
                {
                  <span className="">
                    &#x20B9;{(parseInt(response.price) * value).toLocaleString()}
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
        <h2 className="text-Dark text-2xl font-light text-center -tracking-2 uppercase m-6">Ratings and Reviews</h2>

        <Reviews sku={response.sku} />
        <h2 className="text-Dark text-2xl font-light text-center -tracking-2 uppercase m-6">Related Products</h2>


        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {
            recentResponse && recentResponse.data.map((e, i) => {
              return <Product
                sku={e.sku}
                title={e.title}
                key={i}
                link={e.images}
                price={e.price}
                isMadeToOrder={e.isMadeToOrder}
              />
            })
          }
        </section>
      </main>
    </>
  )
}

export default page
