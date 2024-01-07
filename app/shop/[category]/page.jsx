'use client'
import Product from '@/components/Cards/Product';
import ProductShopPage from '@/components/ProductShopPage';
import { fetchProducts } from '@/utils/services/ShopPageFunctions';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function page() {
    const [data, setData] = useState([])
    const params = useParams();
    const searchParams = useSearchParams();
    let index = parseInt(searchParams.get("p"))
    let { category } = params;
    useEffect(() => {
        fetchProducts(category, index - 1).then((res) => {
            setData(res.data)
        })
    }, [category, index])
    return (
        <>
            {
                category === 'all' ?
                    <ProductShopPage />
                    : category === 'residence' ?
                        <section className='w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 p-2 gap-6'>
                            {data &&
                                data.map((e, i) => (
                                    <Product
                                        key={i}
                                        sku={e.sku}
                                        title={e.title}
                                        price={e.price}
                                        link={e.images}
                                        isMadeToOrder={e.isMadeToOrder}
                                    />
                                ))}
                        </section>
                        : category === 'commercial' ?
                            <section className='w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 p-2 gap-6'>
                                {data &&
                                    data.map((e, i) => (
                                        <Product
                                            key={i}
                                            sku={e.sku}
                                            title={e.title}
                                            price={e.price}
                                            link={e.images}
                                            isMadeToOrder={e.isMadeToOrder}
                                        />
                                    ))}</section> : category === 'studio' ?
                                <section className='w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 p-2 gap-6'>
                                    {data &&
                                        data.map((e, i) => (
                                            <Product
                                                key={i}
                                                sku={e.sku}
                                                title={e.title}
                                                price={e.price}
                                                link={e.images}
                                                isMadeToOrder={e.isMadeToOrder}
                                            />
                                        ))}</section> : null
            }
        </>
    )
}

export default page