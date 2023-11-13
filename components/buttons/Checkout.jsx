'use client'

import { Button } from "@nextui-org/react"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

function Checkout({ amount, sku, price, totalPrice, value, style }) {
    const router = useRouter()
    const { data: session } = useSession()
    const [data, setData] = useState()
    const userData = async () => {
        const email = session?.user?.email
        const res = await axios.post('/api/get-user-by-id', {
            user: email,
            order: false
        })
        setData(res.data)
    }
    const checkout = async (amount) => {
        try {
            const response = await axios.post('/api/checkout', {
                amount
            })
            const { data } = response;
            router.push(`/checkout?amount=${data.order.amount}&order_id=${data.order.id}&product_sku=${sku}&quantity=${value}&price=${price}&totalPrice=${totalPrice}&user_id=${data._id}&email=${session?.user?.email}`)
        } catch (error) {
        }
    }
    useEffect(() => {
        userData()
    },[])
    return (
        <Button onClick={() => checkout(amount)} className= {`${style} bg-Primary h-12 rounded-md border border-Primary text-white`} >
            Buy now
        </Button>
    )
}

export default Checkout