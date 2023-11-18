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
    const isArrayofObjects = (value) => {
        return Array.isArray(value) && value.length > 0 && typeof value[0] === 'object';
    };


    useEffect(() => {
        fetchProducts(category)
    }, [])
    return (
        <>
            <section className={`w-full   ${response.length > 0 ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4' : ''} p-2 gap-6`}>
                {
                    response.length > 0 ? response && response.map((e, i) => (
                        <Product key={i} sku={e.sku} title={e.title} price={e.price} link={e.images} />
                    )) : <h1 className='text-center text-lg   text-Primary p-1'> Can't Find What You Are Looking For! </h1>
                }
            </section>
        </>
    )
}

export default page