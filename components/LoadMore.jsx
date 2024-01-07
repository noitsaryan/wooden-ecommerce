'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

function LoadMore() {
    const { ref, inView } = useInView()
    const [data, setData] = useState([])
    useEffect(() => {
        if (inView) {
            axios.post()
        }
    }, [inView])
    return (
        <div ref={ref} className='flex items-center justify-center'>
            <span className="loader"></span>
        </div>
    )
}

export default LoadMore