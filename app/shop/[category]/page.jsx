'use client'
import Product from '@/components/Cards/Product';
import axios from 'axios';
import { useParams, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function page() {
    const [response, setResponse] = useState([])
    const params = useParams();
    const seachParms=useSearchParams()
    const page=seachParms.get('p')
    const { category } = params;
    const fetchProducts = async (type) => {
        if (category === 'residence' || category === 'commercial' || category === 'studio' || category === 'lighting') {
            const res = await axios.post('/api/get-product-category', {
                type
            })
            setResponse(res.data);
            return;
        } 
        const res = await axios.get('/api/get-products')
        setResponse(res.data)
    }

    useEffect(() => {
        fetchProducts(category)
    }, [])
    return (
        <>
            <section className={`w-full   ${response.length > 0 ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4' : ''} p-2 gap-6`}>
                {
                    response.length > 0 ? response && response.slice(((page*12)-12), page*12).map((e, i) => (
                        <Product key={i} sku={e.sku} title={e.title} price={e.price} link={e.images} />
                    )) : <h1 className='text-center text-lg   text-Primary p-1'> Can't Find What You Are Looking For! </h1>
                }
            </section>
        </>
    )
}

export default page