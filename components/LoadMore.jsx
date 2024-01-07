'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import Product from './Cards/Product';

let index = 1;
let visible = true;

function LoadMore() {
    const { ref, inView } = useInView()
    const [data, setData] = useState([])
    useEffect(() => {
        if (inView) {
            axios.post("/api/get-product-cards", {
                index, quantity: 8
            }).then((res) => {
                if (res.data.length === 0) {
                    visible = false;
                    return
                };
                setData([...data, ...res.data]);
                index++
            })
        }
    }, [inView, data])
    return (
        <>
            <section className='w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 p-2 gap-6'>
                {data && data.map((e, i) => (
                    <Product
                        key={i}
                        sku={e.sku}
                        title={e.title}
                        price={e.price}
                        link={e.images}
                    />
                ))}
            </section>

            {
                 <div ref={ref} className={`${visible ? 'flex items-center justify-center' : 'hidden'}`}>
                    <span className={`loader`}></span>
                </div>
            }

        </>
    )
}

export default LoadMore