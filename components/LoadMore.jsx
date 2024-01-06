'use client'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

function LoadMore() {
    const { ref, inView } = useInView()
    const [data, setData] = useState([])
    useEffect(() => {
        if (inView) {
            console.log("View")
        }
    }, [inView])
    return (
        <div ref={ref}>
            <h1> Load More </h1>
        </div>
    )
}

export default LoadMore