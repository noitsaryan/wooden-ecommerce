'use client'

import { Button } from "@nextui-org/react"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

function Checkout({ amount, sku, price, totalPrice }) {
    const router = useRouter()
    const { data: session } = useSession()
    const userData = async () => {
        const email = session?.user?.email
        const res = await axios.post('/api/get-user-by-id', {
            user: email,
            order: false
        })
        console.log(res)
    }
    const checkout = async (amount) => {
        try {
            const response = await axios.post('/api/checkout', {
                amount
            })
            const { data } = response;
            router.push(`/checkout?amount=${data.order.amount}&order_id=${data.order.id}&product_sku=${sku}&quantity=${5}&price=${price}&totalPrice=${totalPrice}&user_id=${user_id}&email=${session?.user?.email}`)
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        userData()
    })
    return (
        <Button onClick={() => checkout(amount)} className="bg-Primary h-12 rounded-md border border-Primary" >
            Buy now
        </Button>
    )
}

export default Checkout