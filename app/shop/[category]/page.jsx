'use client'
import { storage } from '@/appwrite/appwrite.config';
import Product from '@/components/Cards/Product';
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function page() {
    const [response, setResponse] = useState([])
    const params = useParams();
    const { category } = params;
    const fetchProducts = async (type) => {
        const res = await axios.post('/api/get-product-category', {
            type
        })
        setResponse(res.data)
    }
    const getFilePreview = (image_id) => {
        const imageLink = storage.getFilePreview('65477266d57cd5b74b8c', image_id);
        return imageLink.href;
    }

    useEffect(() => {
        fetchProducts(category)
    }, [])
    return (
        <>
            <section className={`w-full  bg-slate-50 ${ response.length > 0 ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4' : '' } p-2 gap-6`}>
                {
                    response.length>0 ? response && response.map((e, i) => (
                        <Product key={i} sku={e.sku} title={e.title} price={e.price} link={getFilePreview(e.images[0])} />
                    )) : <h1 className='text-center text-xl'> Can't Find What You Are Looking For! </h1>
                }
            </section>
        </>
    )
}

export default page